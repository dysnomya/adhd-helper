import "../styles/login.scss";
import LoginButton from "../components/LoginButton";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Border } from "../assets/login-border.svg";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <Border className="login-border" aria-hidden="true" />

        <Logo className="login-logo" aria-label="ADHD Helper logo" role="img" />
        <h1>Witaj w ADHD Helper :)</h1>
        <div className="login-button">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
