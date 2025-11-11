import "../styles/login.scss";
import LoginButton from "../components/LoginButton";
import { ReactComponent as Logo } from "../assets/green-logo.svg";

export default function Login() {
  return (
    <div className="login-container ">
      <div className="login-card inner-curve">
        <Logo className="login-logo" />
        <h1>Witaj w ADHD Helper :)</h1>
        <div className="login-button">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
