/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

import { BRAND, styles } from './_brand.ts'

interface RecoveryEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteUrl,
  recipient,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Resetujte lozinku za {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Reset lozinke</Heading>
          <Text style={styles.text}>
            Primili smo zahtjev za resetovanje lozinke za nalog{' '}
            <strong>{recipient}</strong>. Kliknite na dugme ispod da postavite novu lozinku:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={confirmationUrl} style={styles.button}>
              🔑 Resetuj lozinku
            </Link>
          </div>
          <Text style={styles.textMuted}>
            Link je ispravan 60 minuta. Ako dugme ne radi, kopirajte ovaj link:
            <br />
            <Link href={confirmationUrl} style={styles.link}>
              {confirmationUrl}
            </Link>
          </Text>
          <hr style={styles.hr} />
          <Text style={styles.textMuted}>
            Ako niste tražili reset lozinke, ignorišite ovaj email — vaš nalog je siguran.
          </Text>
        </Section>
        <Text style={styles.footer}>
          {BRAND.name}
          <br />
          <Link href={siteUrl} style={{ color: BRAND.textMuted }}>
            {siteUrl.replace(/^https?:\/\//, '')}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
