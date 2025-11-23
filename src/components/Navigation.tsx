import { NavLink } from "@/components/NavLink";
import { Home, Activity, Calendar, BookOpen, Users, FileText, Stethoscope } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/milestones", icon: Activity, label: "Milestones" },
    { to: "/screening", icon: Stethoscope, label: "Screening" },
    { to: "/appointments", icon: Calendar, label: "Appointments" },
    { to: "/training", icon: BookOpen, label: "Training" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/journal", icon: FileText, label: "Journal" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto shadow-medium">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-2 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              activeClassName="text-primary bg-primary-light"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
