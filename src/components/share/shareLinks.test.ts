import { describe, expect, it } from "vitest";
import {
  buildEmailLink,
  buildFacebookLink,
  buildLinkedInLink,
  buildTelegramLink,
  buildViberLink,
  buildWhatsAppLink,
  buildXLink,
} from "./shareLinks";

const target = {
  url: "https://balkanlink.de/dolazak?x=1&y=2",
  title: "Dolazak u Njemačku",
  text: "Pogledaj ovo na BalkanLink:",
};

const encUrl = encodeURIComponent(target.url);
const encText = encodeURIComponent(target.text);
const encTitle = encodeURIComponent(target.title);
const encMsg = encodeURIComponent(`${target.text} ${target.url}`);
const encEmailBody = encodeURIComponent(`${target.text}\n\n${target.url}`);

describe("shareLinks", () => {
  it("WhatsApp link wraps text + url and is properly encoded", () => {
    const link = buildWhatsAppLink(target);
    expect(link).toBe(`https://wa.me/?text=${encMsg}`);
    expect(link).not.toContain(" ");
  });

  it("Telegram link uses url + text params", () => {
    expect(buildTelegramLink(target)).toBe(
      `https://t.me/share/url?url=${encUrl}&text=${encText}`,
    );
  });

  it("Viber link uses viber:// scheme", () => {
    const link = buildViberLink(target);
    expect(link.startsWith("viber://forward?text=")).toBe(true);
    expect(link).toContain(encMsg);
  });

  it("Facebook sharer link encodes the url", () => {
    expect(buildFacebookLink(target)).toBe(
      `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
    );
  });

  it("X (Twitter) intent link includes both url and text", () => {
    const link = buildXLink(target);
    expect(link).toContain(`url=${encUrl}`);
    expect(link).toContain(`text=${encText}`);
  });

  it("LinkedIn link encodes url", () => {
    expect(buildLinkedInLink(target)).toBe(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
    );
  });

  it("Email mailto link includes subject and body with newline-separated url", () => {
    const link = buildEmailLink(target);
    expect(link).toBe(`mailto:?subject=${encTitle}&body=${encEmailBody}`);
  });

  it("handles special characters & query params without breaking", () => {
    const tricky = {
      url: "https://example.com/?a=1&b=два&c=#hash",
      title: "Naslov & opis",
      text: "Probaj ovo!",
    };
    const wa = buildWhatsAppLink(tricky);
    expect(wa).toContain(encodeURIComponent(tricky.url));
    expect(wa).toContain(encodeURIComponent("Probaj ovo!"));
    // No raw spaces / ampersands inside the encoded payload
    expect(wa.split("?text=")[1]).not.toContain(" ");
  });
});
