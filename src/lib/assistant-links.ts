import { ASSISTANT_GUIDE_SLUGS, detectAssistantGuide, assistantGuideRoute } from "../../supabase/functions/chat-assistant/guide-context";
export { ASSISTANT_GUIDE_SLUGS, detectAssistantGuide, assistantGuideRoute };

/** Never rewrite explicit links, code, autolinks or link destinations. */
export function autoLinkAssistantText(text: string, rules: [RegExp, string][]): string {
  const linked = new Set<string>();
  return text.split(/(```[\s\S]*?```|`[^`]*`|!?\[[^\]]*\]\([^\n]*?\)|<[^>]+>|https?:\/\/[^\s]+)/g).map((part, i) => {
    if (i % 2 === 1) return part;
    for (const [regex, url] of rules) {
      part = part.split(/(\[[^\]]*\]\([^\n]*?\))/g).map((segment, j) => j % 2 ? segment : segment.replace(regex, match => {
        if (linked.has(url)) return match;
        linked.add(url);
        return `[${match}](${url})`;
      })).join("");
    }
    return part;
  }).join("");
}