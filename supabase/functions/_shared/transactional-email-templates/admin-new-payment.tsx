/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  email?: string
  productLabel?: string
  amountFormatted?: string
  currency?: string
  mode?: string
  transactionId?: string
  paidAt?: string
}

const AdminNewPaymentEmail = ({ email, productLabel, amountFormatted, currency, mode, transactionId, paidAt }: Props) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Nova uplata: {amountFormatted ?? ''} {currency ?? ''} – {productLabel ?? ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>💰 Nova uplata</Heading>
        <Text style={text}>Stigla je nova uplata na BalkanLink (stvarna naplata, ne trial).</Text>

        <Section style={card}>
          <Text style={row}><strong>Proizvod:</strong> {productLabel ?? '—'}</Text>
          <Text style={amount}>{amountFormatted ?? '—'} {currency ?? ''}</Text>
          <Text style={row}><strong>Tip:</strong> {mode === 'subscription' ? 'Pretplata (Premium)' : 'Jednokratno'}</Text>
          <Text style={row}><strong>Email kupca:</strong> {email ?? '—'}</Text>
          <Text style={row}><strong>Transakcija:</strong> {transactionId ?? '—'}</Text>
          <Text style={row}><strong>Vrijeme:</strong> {paidAt ?? new Date().toISOString()}</Text>
        </Section>

        <Hr style={hr} />
        <Text style={footer}>BalkanLink Admin Notification</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminNewPaymentEmail,
  subject: (d: Record<string, any>) =>
    `💰 Nova uplata: ${d?.amountFormatted ?? ''} ${d?.currency ?? ''} – ${d?.productLabel ?? 'BalkanLink'}`,
  displayName: 'Admin – nova uplata',
  previewData: {
    email: 'maja.kovac@example.com',
    productLabel: 'Premium pretplata',
    amountFormatted: '9.99',
    currency: 'EUR',
    mode: 'subscription',
    transactionId: 'pi_test_123',
    paidAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 16px' }
const card = { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', margin: '16px 0' }
const row = { fontSize: '14px', color: '#0f172a', margin: '4px 0' }
const amount = { fontSize: '24px', fontWeight: 'bold' as const, color: '#16a34a', margin: '8px 0' }
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '0' }
