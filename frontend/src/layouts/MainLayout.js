import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";
import {Col, Container, Row} from "react-bootstrap";

export default function LoginLayout() {
    return (
        <Container fluid>
            <Row className="flex-nowrap">
                <Col as='aside' md={2} className="position-fixed vh-100 p-0">
                    <Sidebar />
                </Col>
                <Col as='main' md={10} className="p-0 offset-2">
                    <main style={{padding: "5dvh", height: "100dvh", backgroundColor: "#d4d4d4"}}>
                        <Outlet/>
                    </main>
                </Col>
            </Row>
        </Container>
    );
}