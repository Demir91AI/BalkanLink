import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Početna", to: "/" },
  { label: "Pitanja i odgovori", to: "/qa" },
  { label: "Imenik", to: "/directory" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, loading, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
            BD
          </div>
          <span className="hidden font-heading text-lg font-bold sm:inline-block">
            Balkan<span className="text-primary">DE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                pathname === link.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!loading && !user && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Prijava</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Registracija</Link>
              </Button>
            </>
          )}
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Odjava
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Meni</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="font-heading text-lg font-bold">
              Balkan<span className="text-primary">DE</span>
            </SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent ${
                    pathname === link.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-4 border-t" />
              {!loading && !user && (
                <>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/login" onClick={() => setOpen(false)}>Prijava</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register" onClick={() => setOpen(false)}>Registracija</Link>
                  </Button>
                </>
              )}
              {!loading && user && (
                <Button variant="ghost" size="sm" onClick={() => { signOut(); setOpen(false); }} className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Odjava
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
