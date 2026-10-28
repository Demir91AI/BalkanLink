import { describe, expect, it } from 'vitest';
import { COUNTRY_CONTENT } from './vizaNavigatorContent';
import { VISA_ROUTES } from './visaNavigatorData';
import { getLocalizedCountryContent } from './viza-i18n';
import { overlay as de } from './viza-i18n/de';
import { overlay as hr } from './viza-i18n/hr';
import { overlay as sr } from './viza-i18n/sr';
import shapeBaseline from './viza-accuracy-shape.json';
import bsPages from '@/i18n/locales/bs/pages.json';
import hrPages from '@/i18n/locales/hr/pages.json';
import srPages from '@/i18n/locales/sr/pages.json';
import dePages from '@/i18n/locales/de/pages.json';

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  return typeof value === 'boolean' ? value : '<string>';
}
const text = (value: unknown) => JSON.stringify(value);
const pages = [bsPages, hrPages, srPages, dePages];

describe('Viza content-only accuracy, 28 October 2026', () => {
  it('preserves every base key, array length/order shape and country/route identifier', () => {
    expect(shape(COUNTRY_CONTENT)).toEqual(shapeBaseline);
    expect(COUNTRY_CONTENT.map(c => [c.code, c.routes.map(r => r.id)])).toEqual([
      ['hr', ['eu_info']], ['si', ['eu_info']], ['ba', ['work', 'bluecard', 'family', 'study', 'permanent', 'ausbildung']],
      ['rs', ['work', 'bluecard', 'family', 'study', 'permanent', 'ausbildung']],
      ...['me', 'mk', 'al'].map(code => [code, ['work', 'family', 'permanent', 'ausbildung']]),
      ['xk', ['work', 'bluecard', 'family', 'permanent', 'ausbildung']],
    ]);
  });
  it('preserves identical existing overlay paths and all Westbalkan translation keys', () => {
    expect(hr.map(x => x.path)).toEqual(de.map(x => x.path));
    expect(sr.map(x => x.path)).toEqual(de.map(x => x.path));
    for (const p of pages) expect(Object.keys(p.visa.renderer.wbPanel)).toEqual(Object.keys(bsPages.visa.renderer.wbPanel));
  });
  for (const lang of ['bs', 'hr', 'sr', 'de']) {
    const localized = getLocalizedCountryContent(lang);
    it(`${lang}: uses both 2026 Blue Card thresholds, not 2025 figures`, () => {
      for (const c of localized) for (const r of c.routes.filter(r => r.id === 'bluecard')) {
        expect(text(r)).toContain('50.700');
        expect(text(r)).not.toMatch(/45[.,]300|41[.,]041/);
      }
      expect(text(localized)).toContain('45.934,20');
    });
    it(`${lang}: uses 11,904 annual and 992 monthly student financing`, () => {
      for (const c of localized) for (const r of c.routes.filter(r => r.id === 'study')) {
        expect(text(r)).toContain('11.904');
        expect(text(r)).toContain('992');
        expect(text(r)).not.toContain('11.208');
      }
    });
    it(`${lang}: separates EU permanent residence from third-country settlement conditions`, () => {
      for (const c of localized.filter(c => c.isEU)) {
        expect(c.routes[0].steps[6]).toContain('Daueraufenthaltsrecht');
        expect(c.routes[0].steps[6]).toContain('5');
        expect(c.routes[0].legalBasis).toContain('§ 4a FreizügG/EU');
      }
    });
    it(`${lang}: uses §19c(1) and BA annual approvals on every Westbalkan route`, () => {
      for (const c of localized.filter(c => !c.isEU)) {
        // Existing overlays translate some IDs; this content-only task preserves them.
        const r = c.routes[0];
        expect(r?.legalBasis).toBe('§ 19c Abs. 1 AufenthG + § 26 Abs. 2 BeschV');
        expect(r?.westbalkanNote).toContain('50.000');
        expect(r?.westbalkanNote).toContain('BA');
        expect(r?.westbalkanNote).toContain('24');
        expect(r?.westbalkanNote).toContain('55.770');
      }
    });
  }
  it('keeps static route salary and student values aligned with localized content', () => {
    expect(text(VISA_ROUTES.find(r => r.id === 'blue_card'))).toContain('50.700');
    expect(text(VISA_ROUTES.find(r => r.id === 'blue_card'))).toContain('45.934,20');
    expect(text(VISA_ROUTES.find(r => r.id === 'study'))).toContain('11.904');
    expect(text(VISA_ROUTES.find(r => r.id === 'study'))).toContain('992');
  });
  it('preserves verified Sarajevo family passport exception: 12 rather than 18 months', () => {
    const family = COUNTRY_CONTENT.find(c => c.code === 'ba')?.routes.find(r => r.id === 'family');
    expect(family?.documents[0]).toContain('12 mjeseci');
    expect(family?.documents[0]).not.toContain('18');
  });
  it('retains 27/A1 and 21/B1 Blue Card settlement periods across locales', () => {
    for (const lang of ['bs', 'hr', 'sr', 'de']) {
      const blue = getLocalizedCountryContent(lang).find(c => c.code === 'ba')?.routes.find(r => r.id === 'bluecard');
      expect(blue?.steps[7]).toMatch(/27.*A1.*21.*B1/);
    }
  });
});
describe('Viza regression fix, 28 October 2026', () => {
  const langs = ['bs', 'hr', 'sr', 'de'] as const;
  it('keeps every localized country code and route id identical to the base ids', () => {
    for (const lang of langs) {
      const loc = getLocalizedCountryContent(lang);
      expect(loc.map(c => c.code)).toEqual(COUNTRY_CONTENT.map(c => c.code));
      loc.forEach((c, i) => expect(c.routes.map(r => r.id)).toEqual(COUNTRY_CONTENT[i].routes.map(r => r.id)));
    }
    expect(COUNTRY_CONTENT.reduce((n, c) => n + c.routes.length, 0)).toBe(32);
  });
  it('has no repeated item inside any steps/documents/costs/errors list in any locale', () => {
    for (const lang of langs) {
      for (const c of getLocalizedCountryContent(lang)) for (const r of c.routes) for (const key of ['steps', 'documents', 'costs', 'errors'] as const) {
        const list = (r[key] ?? []) as string[];
        expect(new Set(list).size, `${lang} ${c.code}.${r.id}.${key}`).toBe(list.length);
      }
    }
  });
});
