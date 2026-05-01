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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Potvrdite svoj email za {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Potvrdite svoju email adresu</Heading>
          <Text style={styles.text}>
            Hvala što ste se registrovali na{' '}
            <Link href={siteUrl} style={styles.link}>
              <strong>{BRAND.name}</strong>
            </Link>
            . Da završite registraciju, molimo potvrdite vašu adresu{' '}
            <strong>{recipient}</strong> klikom na dugme ispod:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={confirmationUrl} style={styles.button}>
              ✓ Potvrdi email
            </Link>
          </div>
          <Text style={styles.textMuted}>
            Ako dugme ne radi, kopirajte ovaj link u browser:
            <br />
            <Link href={confirmationUrl} style={styles.link}>
              {confirmationUrl}
            </Link>
          </Text>
          <hr style={styles.hr} />
          <Text style={styles.textMuted}>
            Ako niste vi kreirali nalog na {BRAND.name}, ignorišite ovaj email — niko neće
            imati pristup vašoj adresi.
          </Text>
        </Section>
        <Text style={styles.footer}>
          {BRAND.name} — Vaš vodič kroz život u Njemačkoj
          <br />
          <Link href={siteUrl} style={{ color: BRAND.textMuted }}>
            {siteUrl.replace(/^https?:\/\//, '')}
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
