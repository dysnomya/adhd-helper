import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutButton from "./LogoutButton";


export default function Sidebar() {
    return (
        <div>
            <nav className="w-64 bg-gray-900 text-gray-200 p-6 shadow-2xl flex flex-col">
                <h2 className="text-3xl font-bold mb-10 text-white text-center">
                    ADHD Helper
                </h2>
                <ul className="space-y-4">
                    <NavLink pageUrl={"/dashboard"} pageLabel={"Dashboard"} />
                    <NavLink pageUrl={"/todo"} pageLabel={"Todo"} />
                    <NavLink pageUrl={"/calendar"} pageLabel={"Kalendarz"} />
                    <NavLink pageUrl={"/user"} pageLabel={"User"} />
                </ul>
            </nav>
            <LogoutButton />
        </div>
    );
}