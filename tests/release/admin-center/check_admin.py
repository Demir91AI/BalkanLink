import asyncio,json,time,base64
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/admin-center'); OUT.mkdir(parents=True,exist_ok=True)
HOST='cvobntstjmlpozrbleyu.supabase.co'; KEY='sb-cvobntstjmlpozrbleyu-auth-token'
uid='00000000-0000-4000-8000-0000000000dd'; exp=int(time.time())+7200
b64=lambda d:base64.urlsafe_b64encode(json.dumps(d).encode()).decode().rstrip('=')
user={'id':uid,'aud':'authenticated','role':'authenticated','email':'isolated@example.invalid','email_confirmed_at':'2026-10-01','app_metadata':{},'user_metadata':{'first_name':'Maja'},'created_at':'2026-10-01'}
session={'access_token':b64({'alg':'HS256'})+'.'+b64({'sub':uid,'exp':exp,'role':'authenticated'})+'.isolated','refresh_token':'isolated','token_type':'bearer','expires_in':7200,'expires_at':exp,'user':user}
profiles=[{'id':uid,'email':'isolated@example.invalid','first_name':'Maja','is_premium':True,'subscription_tier':'lifetime','subscription_expires_at':None,'created_at':'2026-10-01','last_login_at':None},{'id':'2','email':'annual@example.invalid','subscription_tier':'annual','is_premium':True,'subscription_expires_at':'2027-01-01','created_at':'2026-10-02'}]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True);results=[]
  for lang in ['bs','hr','sr','de']:
   for width in [390,1280]:
    ctx=await browser.new_context(viewport={'width':width,'height':1800},service_workers='block'); state={'fail':False,'markFail':True,'admin':True,'empty':False,'requests':0,'cap':False,'reviewed':False};errors=[]
    async def backend(route):
     u=route.request.url; method=route.request.method
     if '/auth/v1/user' in u:return await route.fulfill(json=user)
     if '/auth/v1/' in u:return await route.fulfill(json=session)
     if '/user_roles' in u:return await route.fulfill(json={'role':'admin'} if state['admin'] else None)
     if '/profiles' in u:return await route.fulfill(json=profiles[0])
     if 'get_admin_stats' in u:
      state['requests']+=1
      if state['fail']:return await route.fulfill(status=503,json={'message':'isolated'})
      return await route.fulfill(json={'totalUsers':2,'new7d':1,'new30d':2,'views7d':10,'views30d':20,'chat7d':2,'chat30d':3,'viewsByDay':[]})
     if 'get_admin_dashboard_extra' in u:return await route.fulfill(json={'asistentStats':{'uniqueUsers30d':1,'q30d':3}})
     if 'get_admin_users_list' in u:return await route.fulfill(json=[] if state['empty'] else profiles)
     if 'get_usage_aggregates' in u:return await route.fulfill(json=[])
     if 'admin_notification_capabilities' in u:return await route.fulfill(status=200 if state['cap'] else 404,json={'version':1} if state['cap'] else {'message':'not deployed'})
     if 'admin_review_notification' in u:
      state['reviewed']=True
      return await route.fulfill(json={'success':True})
     if '/functions/v1/stripe-sync-audit' in u:return await route.fulfill(json={'summary':{'stripeSubscriptions':2,'stripeActive':2,'mismatches':0},'rows':[],'payments':[]})
     if '/admin_notifications' in u:
      if method=='PATCH':return await route.fulfill(status=503 if state['markFail'] else 200,json={'message':'isolated'} if state['markFail'] else [{'id':'n1','read_at':'2026-10-28T20:00:00Z'}])
      return await route.fulfill(json=[] if state['empty'] else [{'id':'n1','type':'pdf_version_changed','severity':'warning','title':'KG1 source observation','body':'Fictional test event','metadata':{},'read_at':None,'created_at':'2026-10-28T20:00:00Z',**({'source':'check-pdf-versions','status':'approved' if state['reviewed'] else 'pending','dedupe_key':'fixture'} if state['cap'] else {})}])
     return await route.fulfill(json=[] if '/rest/v1/' in u else {})
    await ctx.route(f'**://{HOST}/**',backend)
    page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('dialog',lambda d:d.accept())
    await page.goto('http://localhost:8080');await page.evaluate('([k,v])=>localStorage.setItem(k,v)',[KEY,json.dumps(session)])
    prefix='' if lang=='bs' else '/'+lang
    await page.goto('http://localhost:8080'+prefix+'/admin');labels=json.load(open(f'/dev-server/src/i18n/locales/{lang}/common.json'))['adminCenter']
    await page.get_by_role('heading',name=labels['title'],exact=True).wait_for(timeout=25000)
    await page.get_by_role('heading',name=labels['lifetime'],exact=True).wait_for()
    await page.screenshot(path=str(OUT/f'overview-{lang}-{width}.png'))
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'), 'horizontal overflow'
    state['fail']=True
    await page.get_by_role('button',name=labels['refresh'],exact=True).first.click()
    await page.get_by_text(labels['stale'],exact=True).first.wait_for()
    await page.screenshot(path=str(OUT/f'stale-{lang}-{width}.png'))
    await page.locator('#admin-period').select_option('90')
    assert await page.get_by_text(labels['unsupported'],exact=True).count()>=1
    await page.get_by_role('button',name=labels['notifications'],exact=True).click()
    await page.get_by_text('KG1 source observation',exact=True).wait_for()
    await page.get_by_role('button',name=labels['markRead'],exact=True).click()
    await page.get_by_text(labels['actionFailed'],exact=True).wait_for()
    assert await page.get_by_role('button',name=labels['markRead'],exact=True).count()==1
    state['markFail']=False
    await page.get_by_role('button',name=labels['markRead'],exact=True).click()
    await page.get_by_role('button',name=labels['markUnread'],exact=True).wait_for()
    await page.screenshot(path=str(OUT/f'notifications-{lang}-{width}.png'))
    state['empty']=True
    await page.get_by_role('button',name=labels['refresh'],exact=True).last.click()
    await page.get_by_text(labels['empty'],exact=True).wait_for()
    state['empty']=False
    for key in ['overview','revenue','users','traffic','features','trainer','assistant','geo','costs','goals','sync','stripe']:
     await page.get_by_role('button',name=labels[key],exact=True).first.click()
     await page.wait_for_timeout(100)
    if lang=='bs' and width==1280:
     await page.get_by_role('button',name=labels['stripeLoad'],exact=True).click()
     await page.get_by_text(labels['stripeDefinition'],exact=True).wait_for()
     state['cap']=True
     await page.get_by_role('button',name=labels['notifications'],exact=True).click()
     await page.get_by_role('button',name=labels['approve'],exact=True).wait_for()
     await page.get_by_role('button',name=labels['approve'],exact=True).click()
     await page.get_by_text(labels['approved'],exact=False).wait_for()
     assert state['reviewed']
     await page.screenshot(path=str(OUT/'review-staged.png'))
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert not errors,errors
    results.append({'lang':lang,'width':width,'partial_error':'retained','mutation':'confirmed','empty':'passed','page_errors':errors})
    await ctx.close()
  # Signed-out route: unchanged AdminGuard refuses access.
  ctx=await browser.new_context(viewport={'width':1280,'height':1800},service_workers='block');await ctx.route(f'**://{HOST}/**',lambda r:r.fulfill(json=[]));page=await ctx.new_page();await page.goto('http://localhost:8080/admin');await page.wait_for_url('**/login?redirect=*');results.append({'signed_out':'login redirect'})
  await browser.close();print(json.dumps(results))
asyncio.run(main())
