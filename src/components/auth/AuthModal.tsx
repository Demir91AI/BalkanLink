import { useState, useCallback, useMemo } from "react";
import { X, Loader2, Eye, EyeOff, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";
type View = "auth" | "forgot" | "forgot-sent";

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const [view, setView] = useState<View>("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const reset = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    setView("auth");
    setTab("login");
    onClose();
  }, [onClose, reset]);

  const switchTab = (t: Tab) => {
    setTab(t);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Pogrešan e-mail ili lozinka."); return; }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError("Pogrešan e-mail ili lozinka.");
    } else {
      handleClose();
    }
  };

  const pwRules = useMemo(() => [
    { label: "Minimum 8 znakova", pass: password.length >= 8 },
    { label: "Jedno veliko slovo (A-Z)", pass: /[A-Z]/.test(password) },
    { label: "Jedan broj (0-9)", pass: /[0-9]/.test(password) },
    { label: "Jedan poseban znak (!@#$%...)", pass: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password) },
  ], [password]);
  const allPwRulesPass = pwRules.every(r => r.pass);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Registrierungsfehler."); return; }
    if (!allPwRulesPass) { setError("Lozinka ne ispunjava sigurnosne zahtjeve."); return; }
    if (password !== confirmPassword) { setError("Passwörter stimmen nicht überein."); return; }
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (err) {
      setError("Registrierungsfehler.");
    } else {
      setError("");
      // Show success message — user needs to confirm email
      setError("Prüfe E-Mail für Bestätigung.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) { setError("Pogrešan e-mail ili lozinka."); return; }
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    setView("forgot-sent");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-[420px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F0EDE6] transition-colors"
        >
          <X className="h-4 w-4 text-[#6B6B6B]" />
        </button>

        {view === "auth" && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-[#E8E0D0]">
              <button
                onClick={() => switchTab("login")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  tab === "login"
                    ? "text-[hsl(var(--gold))] border-b-2 border-[hsl(var(--gold))]"
                    : "text-[#6B6B6B] hover:text-[#2D2D2D]"
                }`}
              >
                {"Prijava"}
              </button>
              <button
                onClick={() => switchTab("register")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                  tab === "register"
                    ? "text-[hsl(var(--gold))] border-b-2 border-[hsl(var(--gold))]"
                    : "text-[#6B6B6B] hover:text-[#2D2D2D]"
                }`}
              >
                {"Registracija"}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={tab === "login" ? handleLogin : handleRegister} className="p-6 flex flex-col gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{"E-mail adresa"}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#E8E0D0] bg-[#FAFAF8] text-sm text-[#2D2D2D] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 focus:border-[hsl(var(--gold))] transition-all"
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{"Lozinka"}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border border-[#E8E0D0] bg-[#FAFAF8] text-sm text-[#2D2D2D] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 focus:border-[hsl(var(--gold))] transition-all"
                    placeholder="••••••••"
                    autoComplete={tab === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] hover:text-[#6B6B6B]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                </div>
                {/* Password requirements (register only, shown when password has value) */}
                {tab === "register" && password.length > 0 && (
                  <div className="mt-2 space-y-1 rounded-lg border border-[#E8E0D0] bg-[#FAFAF8] p-2.5">
                    {pwRules.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        {r.pass ? (
                          <Check className="h-3 w-3 text-green-500 shrink-0" />
                        ) : (
                          <span className="h-3 w-3 flex items-center justify-center shrink-0">
                            <span className="block h-1.5 w-1.5 rounded-full bg-[#B0B0B0]" />
                          </span>
                        )}
                        <span className={r.pass ? "text-green-600" : "text-[#6B6B6B]"}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                )}

              {/* Confirm password (register only) */}
              {tab === "register" && (
                <div>
                  <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{"Potvrdi lozinku"}</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#E8E0D0] bg-[#FAFAF8] text-sm text-[#2D2D2D] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 focus:border-[hsl(var(--gold))] transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <p className={`text-xs px-1 ${error === "Provjeri e-mail za potvrdu." ? "text-green-600" : "text-red-500"}`}>
                  {error}
                </p>
              )}

              {/* Forgot password (login only) */}
              {tab === "login" && (
                <button
                  type="button"
                  onClick={() => { setError(""); setView("forgot"); }}
                  className="text-xs text-[hsl(var(--gold))] hover:underline self-end -mt-2"
                >
                  {"Zaboravljena lozinka"}?
                </button>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-[hsl(var(--gold))] text-white font-semibold text-sm hover:brightness-110 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {tab === "login" ? "Prijavi se" : "Registruj se"}
              </button>
            </form>
          </>
        )}

        {/* Forgot password view */}
        {view === "forgot" && (
          <form onSubmit={handleForgot} className="p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#2D2D2D]">{"Zaboravljena lozinka"}</h2>
            <p className="text-sm text-[#6B6B6B]">{"Unesi e-mail za resetovanje."}</p>
            <div>
              <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{"E-mail adresa"}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E8E0D0] bg-[#FAFAF8] text-sm text-[#2D2D2D] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/40 focus:border-[hsl(var(--gold))] transition-all"
                placeholder="email@example.com"
                autoComplete="email"
              />
            </div>
            {error && <p className="text-xs text-red-500 px-1">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[hsl(var(--gold))] text-white font-semibold text-sm hover:brightness-110 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {"Pošalji link"}
            </button>
            <button type="button" onClick={() => { setError(""); setView("auth"); }} className="text-xs text-[hsl(var(--gold))] hover:underline self-center">
              {"Nazad na prijavu"}
            </button>
          </form>
        )}

        {/* Forgot sent confirmation */}
        {view === "forgot-sent" && (
          <div className="p-6 flex flex-col gap-4 items-center text-center">
            <h2 className="text-lg font-bold text-[#2D2D2D]">{"E-Mail prüfen"}</h2>
            <p className="text-sm text-[#6B6B6B]">{"Bestätigungs-E-Mail gesendet."}</p>
            <button
              onClick={handleClose}
              className="mt-2 h-10 px-6 rounded-xl bg-[hsl(var(--gold))] text-white font-semibold text-sm hover:brightness-110 transition-all"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
