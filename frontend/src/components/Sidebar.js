import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";
import { ReactComponent as IconPlaceholder } from "../assets/home-logo.svg";
import { ReactComponent as CalendarPlaceholder } from "../assets/calendar-logo-placeholder.svg";
import { ReactComponent as TodoPlaceholder } from "../assets/todo-logo-placeholder.svg";

import { ReactComponent as Logo } from "../assets/planny-logo.svg";

import "../styles/sidebar.scss";

export default function Sidebar({ collapsed = false, onItemClick }) {
  const items = [
    { pageUrl: "/dashboard", pageLabel: "Dashboard", Icon: IconPlaceholder },
    { pageUrl: "/todo", pageLabel: "Todo", Icon: TodoPlaceholder },
    { pageUrl: "/calendar", pageLabel: "Kalendarz", Icon: CalendarPlaceholder },
    { pageUrl: "/user", pageLabel: "User", Icon: IconPlaceholder },
  ];

  return (
    <nav className={`nav-bar ${collapsed ? "collapsed" : ""}`}>
      <ul>
        <li className="nav-item sidebar-title-item">
          <Logo className="sidebar-logo" />
          <span className="sidebar-text">ADHD Helper</span>
        </li>

        {items.map((item, idx) => (
          <li>
            <SidebarItem
              key={idx}
              pageUrl={item.pageUrl}
              pageLabel={item.pageLabel}
              Icon={item.Icon}
              onClick={onItemClick}
            />
          </li>
        ))}
      </ul>
      <LogoutButton />
    </nav>
  );
}
