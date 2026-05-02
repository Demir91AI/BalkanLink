/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  email?: string
  firstName?: string
  trialCode?: string
  registeredAt?: string
}

const AdminNewUserEmail = ({ email, firstName, trialCode, registeredAt }: Props) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Nova registracija na BalkanLink: {email ?? 'novi korisnik'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 Nova registracija</Heading>
        <Text style={text}>Novi korisnik se upravo registrovao na BalkanLink.</Text>

        <Section style={card}>
          <Text style={row}><strong>Email:</strong> {email ?? '—'}</Text>
          <Text style={row}><strong>Ime:</strong> {firstName || '—'}</Text>
          <Text style={row}><strong>Vrijeme:</strong> {registeredAt ?? new Date().toISOString()}</Text>
          {trialCode && <Text style={row}><strong>Trial kod:</strong> {trialCode}</Text>}
        </Section>

        <Hr style={hr} />
        <Text style={footer}>BalkanLink Admin Notification</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminNewUserEmail,
  subject: (d: Record<string, any>) => `🎉 Nova registracija: ${d?.email ?? 'novi korisnik'}`,
  displayName: 'Admin – nova registracija',
  previewData: { email: 'maja.kovac@example.com', firstName: 'Maja', registeredAt: new Date().toISOString() },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 16px' }
const card = { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', margin: '16px 0' }
const row = { fontSize: '14px', color: '#0f172a', margin: '4px 0' }
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '0' }
