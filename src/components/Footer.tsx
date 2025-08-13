import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] py-8 text-sm text-[color:var(--muted)]">
      <div className="container px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Whatbytes. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded hover:bg-[color:var(--surface)]"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded hover:bg-[color:var(--surface)]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}


