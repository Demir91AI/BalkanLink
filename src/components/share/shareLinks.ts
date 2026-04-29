/**
 * Pure helpers for generating social-share URLs.
 * Kept separate from the React component so logic is unit-testable.
 */

export interface ShareTarget {
  url: string;
  title: string;
  text: string;
}

const enc = (s: string) => encodeURIComponent(s);

export const buildWhatsAppLink = ({ url, text }: ShareTarget) =>
  `https://wa.me/?text=${enc(`${text} ${url}`)}`;

export const buildTelegramLink = ({ url, text }: ShareTarget) =>
  `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`;

export const buildViberLink = ({ url, text }: ShareTarget) =>
  `viber://forward?text=${enc(`${text} ${url}`)}`;

export const buildFacebookLink = ({ url }: ShareTarget) =>
  `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;

export const buildXLink = ({ url, text }: ShareTarget) =>
  `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}`;

export const buildLinkedInLink = ({ url }: ShareTarget) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;

export const buildEmailLink = ({ url, title, text }: ShareTarget) =>
  `mailto:?subject=${enc(title)}&body=${enc(`${text}\n\n${url}`)}`;

/**
 * Instagram has no public web share URL — the official app
 * only accepts shares via Web Share API on mobile, so we expose
 * a "copy link & open Instagram" hint instead.
 */
export const INSTAGRAM_HINT_URL = "https://www.instagram.com/";
