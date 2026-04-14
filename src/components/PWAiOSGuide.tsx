import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, PlusSquare, Smartphone } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onDismiss: () => void;
}

const steps = [
  {
    step: "1",
    icon: <Share2 className="inline h-4 w-4 text-[hsl(210,100%,50%)]" />,
    text: "Tapni Share ikonu (↑) u Safari traci",
  },
  {
    step: "2",
    icon: <PlusSquare className="inline h-4 w-4 text-muted-foreground" />,
    text: 'Izaberi "Dodaj na početni ekran"',
  },
  {
    step: "3",
    icon: <Smartphone className="inline h-4 w-4 text-[hsl(var(--gold))]" />,
    text: "Potvrdi dodavanje — gotovo!",
  },
];

export default function PWAiOSGuide({ open, onClose, onDismiss }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onDismiss(); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Smartphone className="h-5 w-5 text-[hsl(var(--gold))]" />
            Dodaj BalkanLink na početni ekran
          </DialogTitle>
          <DialogDescription className="text-xs">
            Otvorite meni za dijeljenje i izaberite &quot;Dodaj na početni ekran&quot; kako biste koristili BalkanLink kao aplikaciju.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-3">
          {steps.map((s) => (
            <div key={s.step} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold">
                {s.step}
              </span>
              <span className="text-sm text-foreground flex items-center gap-1.5">
                {s.icon} {s.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onClose}
            className="flex-1 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-[hsl(var(--primary))] font-semibold text-sm"
          >
            Razumijem
          </Button>
          <Button variant="outline" onClick={onDismiss} className="flex-1 text-sm">
            Kasnije
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
