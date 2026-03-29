import { useState } from "react";
import { motion } from "framer-motion";
import { STATUS_ITEMS, loadStatus, saveStatus, type StatusChecklist } from "./chatUtils";

export default function ChatProfile() {
  const [status, setStatus] = useState<StatusChecklist>(loadStatus);

  const toggle = (key: string) => {
    const next = { ...status, [key]: !status[key] };
    setStatus(next);
    saveStatus(next);
  };

  const total = STATUS_ITEMS.reduce((sum, g) => sum + g.items.length, 0);
  const done = Object.values(status).filter(Boolean).length;

  return (
    <div className="px-4 py-4 space-y-4 overflow-y-auto flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">👤 Tvoj BalkanLink Status</h3>
        <span className="text-[11px] font-medium text-white/40">{done}/{total}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(done / total) * 100}%` }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #EAB308, #22C55E)" }}
        />
      </div>

      {STATUS_ITEMS.map((group) => (
        <div key={group.group} className="space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">
            {group.group}
          </p>
          {group.items.map((item) => {
            const checked = !!status[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggle(item.key)}
                className={`w-full flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[12px] transition-all ${
                  checked
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-base">
                  {checked ? "✅" : "☐"}
                </span>
                <span className={checked ? "line-through opacity-60" : "font-medium"}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
