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

interface MagicLinkEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteUrl,
  recipient,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Vaš link za prijavu na {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Prijavite se jednim klikom</Heading>
          <Text style={styles.text}>
            Tražili ste link za prijavu za <strong>{recipient}</strong>. Kliknite ispod da se
            prijavite:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={confirmationUrl} style={styles.button}>
              → Prijavi se
            </Link>
          </div>
          <Text style={styles.textMuted}>
            Ako dugme ne radi, kopirajte ovaj link:
            <br />
            <Link href={confirmationUrl} style={styles.link}>
              {confirmationUrl}
            </Link>
          </Text>
          <hr style={styles.hr} />
          <Text style={styles.textMuted}>
            Ako niste vi tražili prijavu, ignorišite ovaj email.
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

export default MagicLinkEmail
