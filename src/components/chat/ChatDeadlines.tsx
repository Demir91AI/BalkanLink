import { motion } from "framer-motion";
import { loadProfile, generateDeadlines } from "./chatUtils";

interface Props {
  onAskChat: (message: string) => void;
}

export default function ChatDeadlines({ onAskChat }: Props) {
  const profile = loadProfile();
  const deadlines = generateDeadlines(profile);

  const grouped = {
    "🔴": deadlines.filter(d => d.priority === "🔴"),
    "🟡": deadlines.filter(d => d.priority === "🟡"),
    "🟢": deadlines.filter(d => d.priority === "🟢"),
  };

  const labels: Record<string, string> = {
    "🔴": "HITNO",
    "🟡": "OVO SEDMICE",
    "🟢": "REDOVNI",
  };

  return (
    <div className="px-4 py-4 space-y-4 overflow-y-auto flex-1">
      <h3 className="text-sm font-bold text-white">⏰ TVOJI ROKOVI</h3>

      {Object.entries(grouped).map(([priority, items]) =>
        items.length > 0 ? (
          <div key={priority} className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">
              {priority} {labels[priority]}
            </p>
            {items.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 space-y-1.5"
              >
                <p className="text-[13px] font-semibold text-white">{d.title}</p>
                <p className="text-[11px] text-white/40">{d.desc}</p>
                <button
                  onClick={() => onAskChat(d.chatMsg)}
                  className="text-[11px] font-medium text-[hsl(45,93%,49%)] hover:text-[hsl(45,93%,60%)] transition-colors"
                >
                  Pokaži mi kako →
                </button>
              </motion.div>
            ))}
          </div>
        ) : null
      )}

      {!profile && (
        <p className="text-[11px] text-white/30 text-center pt-4">
          Završi onboarding da dobiješ personalizovane rokove.
        </p>
      )}
    </div>
  );
}
