import { BarChart3, History, Mic2, Upload } from "lucide-react";

const navItems = [
  { href: "#resume", label: "Resume", icon: Upload },
  { href: "#interview", label: "Interview", icon: Mic2 },
  { href: "#history", label: "History", icon: History },
  { href: "#admin", label: "Admin", icon: BarChart3 }
];

export default function Navbar() {
  return (
    <nav className="topbar">
      <a className="brand" href="#top" aria-label="PrepWise AI home">
        <span className="brandMark">P</span>
        <span>PrepWise AI</span>
      </a>

      <div className="navLinks" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a key={item.href} className="navItem" href={item.href}>
              <Icon size={17} aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>

      <div className="authActions">
        <button className="ghostButton" type="button">
          Login
        </button>

        <button className="primaryButton compact" type="button">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
