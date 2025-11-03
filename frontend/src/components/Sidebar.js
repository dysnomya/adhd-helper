import SidebarItem from "./SidebarItem";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutButton from "./LogoutButton";


export default function Sidebar() {
    return (
        <nav className="nav flex-column bg-light p-4 vh-100 overflow-y-auto">
            <h2 className="display-6">
                ADHD Helper
            </h2>
            <ul className="nav flex-column">
                <SidebarItem pageUrl={"/dashboard"} pageLabel={"Dashboard"}/>
                <SidebarItem pageUrl={"/todo"} pageLabel={"Todo"}/>
                <SidebarItem pageUrl={"/calendar"} pageLabel={"Kalendarz"}/>
                <SidebarItem pageUrl={"/user"} pageLabel={"User"}/>
            </ul>
            <LogoutButton/>
        </nav>
    );
}