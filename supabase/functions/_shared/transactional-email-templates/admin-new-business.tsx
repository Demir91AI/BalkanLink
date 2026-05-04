/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  kind?: string // 'directory' | 'classified' | 'pro'
  name?: string
  category?: string
  city?: string
  description?: string
  contact?: string
  createdAt?: string
}

const AdminNewBusinessEmail = ({ kind, name, category, city, description, contact, createdAt }: Props) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Novi {kind ?? 'oglas'} na BalkanLink: {name ?? ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🏢 Novi {kind === 'classified' ? 'oglas' : kind === 'pro' ? 'PRO servis' : 'unos u imenik'}</Heading>
        <Text style={text}>Stigao je novi unos – provjeri i odobri ako treba.</Text>
        <Section style={card}>
          <Text style={row}><strong>Naziv:</strong> {name ?? '—'}</Text>
          <Text style={row}><strong>Kategorija:</strong> {category || '—'}</Text>
          <Text style={row}><strong>Grad:</strong> {city || '—'}</Text>
          <Text style={row}><strong>Kontakt:</strong> {contact || '—'}</Text>
          <Text style={row}><strong>Opis:</strong> {description || '—'}</Text>
          <Text style={row}><strong>Vrijeme:</strong> {createdAt ?? new Date().toISOString()}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>BalkanLink Admin Notification</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminNewBusinessEmail,
  subject: (d: Record<string, any>) =>
    `🏢 Novi unos (${d?.kind ?? 'oglas'}): ${d?.name ?? 'BalkanLink'}`,
  displayName: 'Admin – novi biznis/oglas',
  previewData: { kind: 'directory', name: 'Caffe Bar Balkan', category: 'Gastronomija', city: 'Berlin', description: 'Novi caffe.', contact: 'info@example.com', createdAt: new Date().toISOString() },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 16px' }
const card = { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', margin: '16px 0' }
const row = { fontSize: '14px', color: '#0f172a', margin: '4px 0' }
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '0' }
