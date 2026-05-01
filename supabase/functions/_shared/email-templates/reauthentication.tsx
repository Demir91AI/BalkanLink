/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Html as _Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

import { BRAND, styles } from './_brand.ts'

interface ReauthEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  token: string
}

export const ReauthenticationEmail = ({
  siteUrl,
  recipient,
  token,
}: ReauthEmailProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Vaš sigurnosni kod za {BRAND.name}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Sigurnosni kod</Heading>
          <Text style={styles.text}>
            Za potvrdu identiteta za <strong>{recipient}</strong>, unesite ovaj kod u aplikaciju:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <span style={styles.code}>{token}</span>
          </div>
          <Text style={styles.textMuted}>
            Kod je ispravan 10 minuta. Nikome ga ne dijelite — {BRAND.name} osoblje vas
            nikada neće tražiti ovaj kod.
          </Text>
          <hr style={styles.hr} />
          <Text style={styles.textMuted}>
            Ako niste vi tražili ovu radnju, odmah promijenite lozinku.
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

export default ReauthenticationEmail
