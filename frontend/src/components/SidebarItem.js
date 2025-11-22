import { NavLink } from "react-router-dom";
import "../styles/sidebar.scss";

export default function SidebarItem({
  pageUrl,
  pageLabel,
  Icon,
  onClick,
  className,
}) {
  return (
    <NavLink
      to={pageUrl}
      className={({ isActive }) =>
        `nav-item ${className || ""} ${isActive ? "active" : ""}`
      }
      onClick={onClick}
    >
      {Icon && <Icon className="sidebar-icon" />}
      <div className="sidebar-text">{pageLabel}</div>
    </NavLink>
  );
}
