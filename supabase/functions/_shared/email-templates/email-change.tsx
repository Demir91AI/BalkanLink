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

interface EmailChangeProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
  email?: string
  newEmail?: string
}

export const EmailChangeEmail = ({
  siteUrl,
  recipient,
  confirmationUrl,
  email,
  newEmail,
}: EmailChangeProps) => (
  <Html lang="bs" dir="ltr">
    <Head />
    <Preview>Potvrdite promjenu email adrese</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Heading style={styles.brand}>{BRAND.name}</Heading>
        </Section>
        <Section style={styles.card}>
          <Heading style={styles.h1}>Potvrdite promjenu emaila</Heading>
          <Text style={styles.text}>
            Tražili ste promjenu email adrese
            {email && newEmail ? (
              <>
                {' '}sa <strong>{email}</strong> na <strong>{newEmail}</strong>
              </>
            ) : (
              <> za nalog <strong>{recipient}</strong></>
            )}
            . Kliknite ispod da potvrdite:
          </Text>
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={confirmationUrl} style={styles.button}>
              ✓ Potvrdi promjenu
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
            Ako niste vi tražili ovu promjenu, ignorišite email i kontaktirajte nas.
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

export default EmailChangeEmail
