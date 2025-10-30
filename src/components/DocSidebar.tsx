import { useState, useEffect } from "react";
import { ChevronRight, FileText } from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: "version",
    title: "VERSION",
    children: [
      { id: "v-1-0", title: "v 1.0" },
      { id: "v-1-1", title: "v 1.1" },
      { id: "v-1-2", title: "v 1.2" },
      { id: "v-1-3", title: "v 1.3" },
      { id: "v-1-4", title: "v 1.4" },
    ],
  },
  { id: "api-flow-diagram", title: "API Flow Diagram" },
  { id: "authentication", title: "Authentication" },
  {
    id: "api-listing",
    title: "API LISTING",
    children: [
      { id: "get-all-biller-categories", title: "1. Get all biller categories" },
      { id: "get-billers-by-category", title: "2. Get billers by category" },
      { id: "get-all-biller-regions", title: "3. Get all biller regions" },
      { id: "get-billers-by-region", title: "4. Get billers by region" },
      { id: "get-all-billers", title: "5. Get all billers" },
      { id: "get-biller-by-id", title: "6. Get biller by Id" },
      { id: "fetch-plans", title: "7. Fetch Plans" },
      {
        id: "bill-fetch",
        title: "8. Bill Fetch",
        children: [
          { id: "bill-fetch-int", title: "a) INT (Internet)" },
          { id: "bill-fetch-mob", title: "b) MOB (Mobile)" },
          { id: "bill-fetch-agt", title: "c) AGT (Agent)" },
        ],
      },
      { id: "bill-validation", title: "9. Bill Validation" },
      {
        id: "bill-payment",
        title: "10. Bill Payment",
        children: [
          { id: "bill-payment-int", title: "a) INT (Internet)" },
          { id: "bill-payment-mob", title: "b) MOB (Mobile)" },
          { id: "bill-payment-agt", title: "c) AGT(Agent)" },
        ],
      },
      { id: "complaint-disposition", title: "11. Complaint Disposition" },
      { id: "raise-complaint", title: "12. Raise Complaint" },
      { id: "check-complaint-status", title: "13. Check Complaint's Status" },
      { id: "check-transaction-status", title: "14. Check Transaction Status" },
    ],
  },
  { id: "error-pattern", title: "Error Pattern" },
  { id: "track-lpg-gas-booking", title: "15. Track LPG Gas Booking Status" },
  {
    id: "notes",
    title: "Notes: -",
    children: [
      { id: "payment-mode-info", title: "Payment Mode & Payment Information" },
      {
        id: "payment-mode-vs-initiating-channel",
        title: "Payment Mode VS Initiating Channel  Combinations",
      },
    ],
  },
];

interface NavItemComponentProps {
  item: NavItem;
  level?: number;
  activeId: string;
  onItemClick: (id: string) => void;
  collapsed: boolean;
}

const NavItemComponent = ({
  item,
  level = 0,
  activeId,
  onItemClick,
  collapsed,
}: NavItemComponentProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  return (
    <div className={level > 0 ? "ml-4 w-full" : "w-full"}>
      <button
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          }
          onItemClick(item.id);
        }}
        className={`w-full px-3 py-2 rounded-md text-left flex items-center justify-between transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-900 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        } ${level === 0 ? "font-medium" : ""}`}
      >
        <span className="flex items-center gap-2 flex-1 min-w-0">
          {level === 0 && <FileText className="h-4 w-4 flex-shrink-0" />}
          {!collapsed && <span className="truncate">{item.title}</span>}
        </span>
        {!collapsed && hasChildren && (
          <ChevronRight
            className={`h-4 w-4 transition-transform flex-shrink-0 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </button>

      {!collapsed && hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function DocSidebar() {
  const [activeId, setActiveId] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let currentId = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentId = section.getAttribute("data-section") || "";
        }
      });

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div
      className={`border-r border-gray-200 transition-all duration-300 h-full sticky bg-white ${
        collapsed ? "w-20" : "w-72"
      }`}
      style={{ position: "sticky", top: 0 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900">
            Table of Content
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      <div
        className="px-2 py-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 7.5rem - 57px)" }}
      >
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.id}
              item={item}
              activeId={activeId}
              onItemClick={handleItemClick}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}