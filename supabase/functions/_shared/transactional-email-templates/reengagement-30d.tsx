import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'BalkanLink'
const SITE_URL = 'https://balkanlink.de'

interface Props {
  name?: string
  lang?: 'bs' | 'de' | 'hr' | 'sr'
}

const COPY = {
  bs: {
    preview: 'Tvoj njemački vodič te čeka',
    hi: (n?: string) => (n ? `Hej ${n},` : 'Hej,'),
    intro: 'Prošlo je već mjesec dana. Možda ti baš sada treba pomoć oko jednog od ovih:',
    items: [
      '🏠 Wohngeld – provjeri imaš li pravo',
      '👶 Kindergeld – kompletna check lista',
      '📄 Anerkennung diplome – korak po korak',
      '💼 Biznis u Njemačkoj – Gewerbe vodič',
    ],
    closing: 'Sve je dostupno na bosanskom, hrvatskom, srpskom i njemačkom.',
    cta: 'Pogledaj šta je novo',
    footer: 'Tvoj BalkanLink tim',
  },
  de: {
    preview: 'Dein Deutschland-Guide wartet auf dich',
    hi: (n?: string) => (n ? `Hi ${n},` : 'Hi,'),
    intro: 'Es ist schon ein Monat her. Vielleicht brauchst du gerade Hilfe bei einem davon:',
    items: [
      '🏠 Wohngeld – prüfe deinen Anspruch',
      '👶 Kindergeld – komplette Checkliste',
      '📄 Diplom-Anerkennung – Schritt für Schritt',
      '💼 Business in Deutschland – Gewerbe-Guide',
    ],
    closing: 'Alles verfügbar auf Bosnisch, Kroatisch, Serbisch und Deutsch.',
    cta: 'Schau, was neu ist',
    footer: 'Dein BalkanLink-Team',
  },
  hr: {
    preview: 'Tvoj njemački vodič te čeka',
    hi: (n?: string) => (n ? `Bok ${n},` : 'Bok,'),
    intro: 'Prošlo je već mjesec dana. Možda ti baš sada treba pomoć oko jednog od ovih:',
    items: [
      '🏠 Wohngeld – provjeri imaš li pravo',
      '👶 Kindergeld – kompletna check lista',
      '📄 Priznavanje diplome – korak po korak',
      '💼 Biznis u Njemačkoj – Gewerbe vodič',
    ],
    closing: 'Sve je dostupno na bosanskom, hrvatskom, srpskom i njemačkom.',
    cta: 'Pogledaj što je novo',
    footer: 'Tvoj BalkanLink tim',
  },
  sr: {
    preview: 'Tvoj nemački vodič te čeka',
    hi: (n?: string) => (n ? `Hej ${n},` : 'Hej,'),
    intro: 'Prošlo je već mesec dana. Možda ti baš sada treba pomoć oko jednog od ovih:',
    items: [
      '🏠 Wohngeld – proveri imaš li pravo',
      '👶 Kindergeld – kompletna čeklista',
      '📄 Priznavanje diplome – korak po korak',
      '💼 Biznis u Nemačkoj – Gewerbe vodič',
    ],
    closing: 'Sve je dostupno na bosanskom, hrvatskom, srpskom i nemačkom.',
    cta: 'Pogledaj šta je novo',
    footer: 'Tvoj BalkanLink tim',
  },
}

const Email = ({ name, lang = 'bs' }: Props) => {
  const t = COPY[lang] || COPY.bs
  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.hi(name)}</Heading>
          <Text style={text}>{t.intro}</Text>
          <Section style={list}>
            {t.items.map((it, i) => (
              <Text key={i} style={item}>{it}</Text>
            ))}
          </Section>
          <Text style={text}>{t.closing}</Text>
          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button href={SITE_URL} style={button}>{t.cta}</Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>{t.footer}</Text>
          <Text style={small}>
            <Link href={SITE_URL} style={link}>{SITE_NAME}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => {
    const lang = (d?.lang || 'bs') as keyof typeof COPY
    const subjects = {
      bs: 'Mjesec dana bez tebe – evo šta si propustio',
      de: 'Ein Monat ohne dich – das hast du verpasst',
      hr: 'Mjesec dana bez tebe – evo što si propustio',
      sr: 'Mesec dana bez tebe – evo šta si propustio',
    }
    return subjects[lang] || subjects.bs
  },
  displayName: 'Re-engagement 30 dana',
  previewData: { name: 'Damir', lang: 'bs' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const list = { margin: '16px 0 20px' }
const item = { fontSize: '15px', color: '#0f172a', lineHeight: '1.7', margin: '0 0 8px' }
const button = {
  backgroundColor: '#d4a93a',
  color: '#0f172a',
  padding: '12px 28px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e2e8f0', margin: '32px 0 16px' }
const footer = { fontSize: '13px', color: '#64748b', margin: '0 0 8px' }
const small = { fontSize: '12px', color: '#94a3b8', margin: '0' }
const link = { color: '#d4a93a', textDecoration: 'none' }
