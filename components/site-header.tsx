import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Left: Primary Navigation */}
        <MainNav />

        {/* Center: CLI Endpoint Hint */}
        <div className="flex-1 text-center font-mono text-sm text-muted-foreground text-white hidden lg:block">
          $curl https://www.dev-xdd.tech
        </div>

        {/* Right: Icons & Toggles */}
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0"
                )}
              >
                <Icons.linkedin className="h-4 w-4" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
          </nav>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
