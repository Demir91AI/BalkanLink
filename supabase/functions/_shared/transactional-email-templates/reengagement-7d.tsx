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
    preview: 'Imamo nešto novo za tebe na BalkanLinku',
    hi: (n?: string) => (n ? `Zdravo ${n}!` : 'Zdravo!'),
    intro: 'Primijetili smo da te nije bilo kod nas neko vrijeme. U međuvremenu smo dodali nove alate koji ti mogu pomoći u Njemačkoj:',
    items: [
      '📋 Anmeldung Simulator – vježbaj termin u Bürgeramtu',
      '✅ Premium Check liste – sve potrebne dokumente za Kindergeld, Bürgergeld, Wohngeld...',
      '🤖 Asistent – brzi odgovori na njemačku birokratiju',
    ],
    cta: 'Vrati se na BalkanLink',
    footer: 'Vidimo se uskoro,\nTim BalkanLink',
  },
  de: {
    preview: 'Wir haben Neues für dich bei BalkanLink',
    hi: (n?: string) => (n ? `Hallo ${n}!` : 'Hallo!'),
    intro: 'Wir haben dich eine Weile nicht gesehen. In der Zwischenzeit haben wir neue Tools hinzugefügt:',
    items: [
      '📋 Anmeldung-Simulator – übe deinen Bürgeramt-Termin',
      '✅ Premium-Checklisten – alle Dokumente für Kindergeld, Bürgergeld, Wohngeld...',
      '🤖 Assistent – schnelle Antworten zur deutschen Bürokratie',
    ],
    cta: 'Zurück zu BalkanLink',
    footer: 'Bis bald,\nDein BalkanLink-Team',
  },
  hr: {
    preview: 'Imamo nešto novo za tebe na BalkanLinku',
    hi: (n?: string) => (n ? `Pozdrav ${n}!` : 'Pozdrav!'),
    intro: 'Primijetili smo da te nije bilo kod nas neko vrijeme. U međuvremenu smo dodali nove alate:',
    items: [
      '📋 Anmeldung Simulator – vježbaj termin u Bürgeramtu',
      '✅ Premium Check liste – svi dokumenti za Kindergeld, Bürgergeld, Wohngeld...',
      '🤖 Asistent – brzi odgovori na njemačku birokraciju',
    ],
    cta: 'Vrati se na BalkanLink',
    footer: 'Vidimo se uskoro,\nTim BalkanLink',
  },
  sr: {
    preview: 'Imamo nešto novo za tebe na BalkanLinku',
    hi: (n?: string) => (n ? `Zdravo ${n}!` : 'Zdravo!'),
    intro: 'Primetili smo da te nije bilo kod nas neko vreme. U međuvremenu smo dodali nove alate:',
    items: [
      '📋 Anmeldung Simulator – vežbaj termin u Bürgeramtu',
      '✅ Premium Čekliste – svi dokumenti za Kindergeld, Bürgergeld, Wohngeld...',
      '🤖 Asistent – brzi odgovori na nemačku birokratiju',
    ],
    cta: 'Vrati se na BalkanLink',
    footer: 'Vidimo se uskoro,\nTim BalkanLink',
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
      bs: 'Nedostaješ nam – nove alate na BalkanLinku',
      de: 'Wir vermissen dich – Neues bei BalkanLink',
      hr: 'Nedostaješ nam – nove alate na BalkanLinku',
      sr: 'Nedostaješ nam – nove alate na BalkanLinku',
    }
    return subjects[lang] || subjects.bs
  },
  displayName: 'Re-engagement 7 dana',
  previewData: { name: 'Maja', lang: 'bs' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const list = { margin: '16px 0' }
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
const footer = { fontSize: '13px', color: '#64748b', whiteSpace: 'pre-line' as const, margin: '0 0 8px' }
const small = { fontSize: '12px', color: '#94a3b8', margin: '0' }
const link = { color: '#d4a93a', textDecoration: 'none' }
