import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de_common from "./locales/de/common.json";
import de_header from "./locales/de/header.json";
import de_hero from "./locales/de/hero.json";
import de_homepage from "./locales/de/homepage.json";
import de_footer from "./locales/de/footer.json";
import de_sideMenu from "./locales/de/sideMenu.json";
import de_rightPanel from "./locales/de/rightPanel.json";
import de_formulare from "./locales/de/formulare.json";
import de_visaNavigator from "./locales/de/visaNavigator.json";
import de_dokumentencheck from "./locales/de/dokumentencheck.json";
import de_deutsch from "./locales/de/deutsch.json";
import de_chatbot from "./locales/de/chatbot.json";
import de_calculators from "./locales/de/calculators.json";
import de_cookies from "./locales/de/cookies.json";
import de_validation from "./locales/de/validation.json";
import de_status from "./locales/de/status.json";
import de_premium from "./locales/de/premium.json";
import de_ads from "./locales/de/ads.json";
import de_nudimTrazim from "./locales/de/nudimTrazim.json";

import bs_common from "./locales/bs/common.json";
import bs_header from "./locales/bs/header.json";
import bs_hero from "./locales/bs/hero.json";
import bs_homepage from "./locales/bs/homepage.json";
import bs_footer from "./locales/bs/footer.json";
import bs_sideMenu from "./locales/bs/sideMenu.json";
import bs_rightPanel from "./locales/bs/rightPanel.json";
import bs_formulare from "./locales/bs/formulare.json";
import bs_visaNavigator from "./locales/bs/visaNavigator.json";
import bs_dokumentencheck from "./locales/bs/dokumentencheck.json";
import bs_deutsch from "./locales/bs/deutsch.json";
import bs_chatbot from "./locales/bs/chatbot.json";
import bs_calculators from "./locales/bs/calculators.json";
import bs_cookies from "./locales/bs/cookies.json";
import bs_validation from "./locales/bs/validation.json";
import bs_status from "./locales/bs/status.json";
import bs_premium from "./locales/bs/premium.json";
import bs_ads from "./locales/bs/ads.json";
import bs_nudimTrazim from "./locales/bs/nudimTrazim.json";

import hr_common from "./locales/hr/common.json";
import hr_header from "./locales/hr/header.json";
import hr_hero from "./locales/hr/hero.json";
import hr_homepage from "./locales/hr/homepage.json";
import hr_footer from "./locales/hr/footer.json";
import hr_sideMenu from "./locales/hr/sideMenu.json";
import hr_rightPanel from "./locales/hr/rightPanel.json";
import hr_formulare from "./locales/hr/formulare.json";
import hr_visaNavigator from "./locales/hr/visaNavigator.json";
import hr_dokumentencheck from "./locales/hr/dokumentencheck.json";
import hr_deutsch from "./locales/hr/deutsch.json";
import hr_chatbot from "./locales/hr/chatbot.json";
import hr_calculators from "./locales/hr/calculators.json";
import hr_cookies from "./locales/hr/cookies.json";
import hr_validation from "./locales/hr/validation.json";
import hr_status from "./locales/hr/status.json";
import hr_premium from "./locales/hr/premium.json";
import hr_ads from "./locales/hr/ads.json";
import hr_nudimTrazim from "./locales/hr/nudimTrazim.json";

import sr_common from "./locales/sr/common.json";
import sr_header from "./locales/sr/header.json";
import sr_hero from "./locales/sr/hero.json";
import sr_homepage from "./locales/sr/homepage.json";
import sr_footer from "./locales/sr/footer.json";
import sr_sideMenu from "./locales/sr/sideMenu.json";
import sr_rightPanel from "./locales/sr/rightPanel.json";
import sr_formulare from "./locales/sr/formulare.json";
import sr_visaNavigator from "./locales/sr/visaNavigator.json";
import sr_dokumentencheck from "./locales/sr/dokumentencheck.json";
import sr_deutsch from "./locales/sr/deutsch.json";
import sr_chatbot from "./locales/sr/chatbot.json";
import sr_calculators from "./locales/sr/calculators.json";
import sr_cookies from "./locales/sr/cookies.json";
import sr_validation from "./locales/sr/validation.json";
import sr_status from "./locales/sr/status.json";
import sr_premium from "./locales/sr/premium.json";
import sr_ads from "./locales/sr/ads.json";
import sr_nudimTrazim from "./locales/sr/nudimTrazim.json";

import me_common from "./locales/me/common.json";
import me_header from "./locales/me/header.json";
import me_hero from "./locales/me/hero.json";
import me_homepage from "./locales/me/homepage.json";
import me_footer from "./locales/me/footer.json";
import me_sideMenu from "./locales/me/sideMenu.json";
import me_rightPanel from "./locales/me/rightPanel.json";
import me_formulare from "./locales/me/formulare.json";
import me_visaNavigator from "./locales/me/visaNavigator.json";
import me_dokumentencheck from "./locales/me/dokumentencheck.json";
import me_deutsch from "./locales/me/deutsch.json";
import me_chatbot from "./locales/me/chatbot.json";
import me_calculators from "./locales/me/calculators.json";
import me_cookies from "./locales/me/cookies.json";
import me_validation from "./locales/me/validation.json";
import me_status from "./locales/me/status.json";
import me_premium from "./locales/me/premium.json";
import me_ads from "./locales/me/ads.json";
import me_nudimTrazim from "./locales/me/nudimTrazim.json";

import sl_common from "./locales/sl/common.json";
import sl_header from "./locales/sl/header.json";
import sl_hero from "./locales/sl/hero.json";
import sl_homepage from "./locales/sl/homepage.json";
import sl_footer from "./locales/sl/footer.json";
import sl_sideMenu from "./locales/sl/sideMenu.json";
import sl_rightPanel from "./locales/sl/rightPanel.json";
import sl_formulare from "./locales/sl/formulare.json";
import sl_visaNavigator from "./locales/sl/visaNavigator.json";
import sl_dokumentencheck from "./locales/sl/dokumentencheck.json";
import sl_deutsch from "./locales/sl/deutsch.json";
import sl_chatbot from "./locales/sl/chatbot.json";
import sl_calculators from "./locales/sl/calculators.json";
import sl_cookies from "./locales/sl/cookies.json";
import sl_validation from "./locales/sl/validation.json";
import sl_status from "./locales/sl/status.json";
import sl_premium from "./locales/sl/premium.json";
import sl_ads from "./locales/sl/ads.json";
import sl_nudimTrazim from "./locales/sl/nudimTrazim.json";

import mk_common from "./locales/mk/common.json";
import mk_header from "./locales/mk/header.json";
import mk_hero from "./locales/mk/hero.json";
import mk_homepage from "./locales/mk/homepage.json";
import mk_footer from "./locales/mk/footer.json";
import mk_sideMenu from "./locales/mk/sideMenu.json";
import mk_rightPanel from "./locales/mk/rightPanel.json";
import mk_formulare from "./locales/mk/formulare.json";
import mk_visaNavigator from "./locales/mk/visaNavigator.json";
import mk_dokumentencheck from "./locales/mk/dokumentencheck.json";
import mk_deutsch from "./locales/mk/deutsch.json";
import mk_chatbot from "./locales/mk/chatbot.json";
import mk_calculators from "./locales/mk/calculators.json";
import mk_cookies from "./locales/mk/cookies.json";
import mk_validation from "./locales/mk/validation.json";
import mk_status from "./locales/mk/status.json";
import mk_premium from "./locales/mk/premium.json";
import mk_ads from "./locales/mk/ads.json";
import mk_nudimTrazim from "./locales/mk/nudimTrazim.json";

import sq_common from "./locales/sq/common.json";
import sq_header from "./locales/sq/header.json";
import sq_hero from "./locales/sq/hero.json";
import sq_homepage from "./locales/sq/homepage.json";
import sq_footer from "./locales/sq/footer.json";
import sq_sideMenu from "./locales/sq/sideMenu.json";
import sq_rightPanel from "./locales/sq/rightPanel.json";
import sq_formulare from "./locales/sq/formulare.json";
import sq_visaNavigator from "./locales/sq/visaNavigator.json";
import sq_dokumentencheck from "./locales/sq/dokumentencheck.json";
import sq_deutsch from "./locales/sq/deutsch.json";
import sq_chatbot from "./locales/sq/chatbot.json";
import sq_calculators from "./locales/sq/calculators.json";
import sq_cookies from "./locales/sq/cookies.json";
import sq_validation from "./locales/sq/validation.json";
import sq_status from "./locales/sq/status.json";
import sq_premium from "./locales/sq/premium.json";
import sq_ads from "./locales/sq/ads.json";
import sq_nudimTrazim from "./locales/sq/nudimTrazim.json";

const NS_LIST = [
  "common","header","hero","homepage","footer","sideMenu","rightPanel",
  "formulare","visaNavigator","dokumentencheck","deutsch","chatbot",
  "calculators","cookies","validation","status","premium","ads","nudimTrazim"
] as const;

const buildLang = (c: any, h: any, he: any, hp: any, f: any, sm: any, rp: any, fo: any, vn: any, dc: any, de: any, cb: any, ca: any, co: any, va: any, st: any, pr: any, ad: any, nt: any) => ({
  common: c, header: h, hero: he, homepage: hp, footer: f, sideMenu: sm,
  rightPanel: rp, formulare: fo, visaNavigator: vn, dokumentencheck: dc,
  deutsch: de, chatbot: cb, calculators: ca, cookies: co, validation: va,
  status: st, premium: pr, ads: ad, nudimTrazim: nt
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: buildLang(de_common,de_header,de_hero,de_homepage,de_footer,de_sideMenu,de_rightPanel,de_formulare,de_visaNavigator,de_dokumentencheck,de_deutsch,de_chatbot,de_calculators,de_cookies,de_validation,de_status,de_premium,de_ads,de_nudimTrazim),
      bs: buildLang(bs_common,bs_header,bs_hero,bs_homepage,bs_footer,bs_sideMenu,bs_rightPanel,bs_formulare,bs_visaNavigator,bs_dokumentencheck,bs_deutsch,bs_chatbot,bs_calculators,bs_cookies,bs_validation,bs_status,bs_premium,bs_ads,bs_nudimTrazim),
      hr: buildLang(hr_common,hr_header,hr_hero,hr_homepage,hr_footer,hr_sideMenu,hr_rightPanel,hr_formulare,hr_visaNavigator,hr_dokumentencheck,hr_deutsch,hr_chatbot,hr_calculators,hr_cookies,hr_validation,hr_status,hr_premium,hr_ads,hr_nudimTrazim),
      sr: buildLang(sr_common,sr_header,sr_hero,sr_homepage,sr_footer,sr_sideMenu,sr_rightPanel,sr_formulare,sr_visaNavigator,sr_dokumentencheck,sr_deutsch,sr_chatbot,sr_calculators,sr_cookies,sr_validation,sr_status,sr_premium,sr_ads,sr_nudimTrazim),
      me: buildLang(me_common,me_header,me_hero,me_homepage,me_footer,me_sideMenu,me_rightPanel,me_formulare,me_visaNavigator,me_dokumentencheck,me_deutsch,me_chatbot,me_calculators,me_cookies,me_validation,me_status,me_premium,me_ads,me_nudimTrazim),
      sl: buildLang(sl_common,sl_header,sl_hero,sl_homepage,sl_footer,sl_sideMenu,sl_rightPanel,sl_formulare,sl_visaNavigator,sl_dokumentencheck,sl_deutsch,sl_chatbot,sl_calculators,sl_cookies,sl_validation,sl_status,sl_premium,sl_ads,sl_nudimTrazim),
      mk: buildLang(mk_common,mk_header,mk_hero,mk_homepage,mk_footer,mk_sideMenu,mk_rightPanel,mk_formulare,mk_visaNavigator,mk_dokumentencheck,mk_deutsch,mk_chatbot,mk_calculators,mk_cookies,mk_validation,mk_status,mk_premium,mk_ads,mk_nudimTrazim),
      sq: buildLang(sq_common,sq_header,sq_hero,sq_homepage,sq_footer,sq_sideMenu,sq_rightPanel,sq_formulare,sq_visaNavigator,sq_dokumentencheck,sq_deutsch,sq_chatbot,sq_calculators,sq_cookies,sq_validation,sq_status,sq_premium,sq_ads,sq_nudimTrazim),
    },
    lng: localStorage.getItem("app_language") || "de",
    fallbackLng: "de",
    defaultNS: "common",
    ns: [...NS_LIST],
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "app_language",
      caches: ["localStorage"]
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
