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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteUrl,
  recipient,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Pozvani ste na {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Pozvani ste!</Heading>
          <Text style={styles.text}>
            Pozvani ste da se pridružite {BRAND.name} kao <strong>{recipient}</strong>.
            Kliknite ispod da prihvatite poziv i kreirate svoj nalog:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={confirmationUrl} style={styles.button}>
              ✓ Prihvati poziv
            </Link>
          </div>
          <Text style={styles.textMuted}>
            Ako dugme ne radi, kopirajte ovaj link:
            <br />
            <Link href={confirmationUrl} style={styles.link}>
              {confirmationUrl}
            </Link>
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

export default InviteEmail
