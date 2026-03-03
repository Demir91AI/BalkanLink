import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, MapPin, Phone, Mail, Flag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAds } from "@/hooks/useAds";
import { AD_DOMAINS, AD_TYPES, MREZA_DISCLAIMER } from "@/lib/mreza-constants";
import { BUNDESLAENDER } from "@/lib/germany-data";

const DOMAIN_LABELS: Record<string, string> = { JOB: "Posao", SERVICE: "Usluga", HOUSING: "Stanovanje", CAR: "Auto" };
const TYPE_LABELS: Record<string, string> = { SEEKING: "Tražim", OFFERING: "Nudim" };

export default function MrezaOglasi() {
  const [type, setType] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [bundesland, setBundesland] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  const { data: ads = [], isLoading } = useAds({
    type: type || undefined,
    domain: domain || undefined,
    bundesland: bundesland || undefined,
    keyword: keyword || undefined,
  });

  return (
    <div className="container max-w-4xl py-8 sm:py-12 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Oglasi</h1>
          <p className="text-sm text-muted-foreground">Besplatni oglasi — traju 15 dana</p>
        </div>
        <Button asChild size="sm" className="shrink-0">
          <Link to="/mreza/oglasi/novo"><Plus className="mr-1.5 h-4 w-4" />Objavi oglas</Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1 rounded-lg border border-border/60 p-0.5">
          <button onClick={() => setType("")} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${!type ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Sve</button>
          {AD_TYPES.map(t => (
            <button key={t.value} onClick={() => setType(t.value)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${type === t.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t.label}</button>
          ))}
        </div>
        <Select value={domain} onValueChange={v => setDomain(v === "ALL" ? "" : v)}>
          <SelectTrigger className="h-9 w-[140px] text-xs"><SelectValue placeholder="Kategorija" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Sve kategorije</SelectItem>
            {AD_DOMAINS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={bundesland} onValueChange={v => setBundesland(v === "ALL" ? "" : v)}>
          <SelectTrigger className="h-9 w-[180px] text-xs"><SelectValue placeholder="Bundesland" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Svi Bundesländer</SelectItem>
            {BUNDESLAENDER.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[160px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pretraga..." className="h-9 pl-8 text-xs" value={keyword} onChange={e => setKeyword(e.target.value)} />
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">Učitavanje...</div>
      ) : ads.length === 0 ? (
        <div className="rounded-xl border border-border/40 bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Nema oglasa za odabrane filtere.</p>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link to="/mreza/oglasi/novo">Objavi prvi oglas</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {ads.map(ad => (
            <div key={ad.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <Badge variant="outline" className="text-[10px]">{TYPE_LABELS[ad.type] || ad.type}</Badge>
                    <Badge variant="secondary" className="text-[10px]">{DOMAIN_LABELS[ad.domain] || ad.domain}</Badge>
                    {ad.category && <Badge variant="secondary" className="text-[10px]">{ad.category}</Badge>}
                  </div>
                  <h3 className="font-semibold text-sm leading-tight">{ad.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{ad.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ad.city}, {ad.bundesland}</span>
                    <span className="flex items-center gap-1">
                      {ad.contact_type === "PHONE" ? <Phone className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                      {ad.contact_value}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {/* TODO: report */}}
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Prijavi oglas"
                >
                  <Flag className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground/60 leading-relaxed">{MREZA_DISCLAIMER}</p>
    </div>
  );
}
