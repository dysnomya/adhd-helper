import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Col, Container, Row } from "react-bootstrap";

import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/sidebar.scss";

export default function LoginLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Container fluid>
      <Row className="flex-nowrap">
        {/* DESKTOP SIDEBAR (collapsed until hover) */}
        <Col
          as="aside"
          className="d-none d-md-block position-fixed vh-100 p-0 desktop-sidebar"
        >
          <Sidebar collapsed={true} />
        </Col>

        {/* MOBILE TOP BAR */}
        <div className="mobile-topbar d-md-none">
          <div className="mobile-topbar-left-side">
            <Logo className="mobile-topbar-logo" />
            <h2>ADHD Helper</h2>
          </div>

          <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
            ≡
          </button>
        </div>

        {/* MOBILE DROPDOWN SIDEBAR */}
        <div className={`mobile-dropdown ${open ? "open" : ""}`}>
          <Sidebar
            collapsed={false}
            onItemClick={() => setOpen(!open)} // closes sidebar for all items
          />
        </div>

        {/* MAIN CONTENT */}
        <Col as="main" className="p-0">
          <main className="p-4 mt-md-0 mt-5">
            <Outlet />
          </main>
        </Col>
      </Row>
    </Container>
  );
}
