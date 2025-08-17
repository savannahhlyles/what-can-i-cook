import { Link } from "react-router-dom";
import "../styles/Header.css";
import bookmark from "../assets/images/bookmark.svg";

function Header() {
  return (
    <header className="site-header">
      <nav className="nav-bar">
        {/* Left side (Chef Logo) */}
        <div className="logo">
          <Link to="/">
            <img src="chef.svg" alt="Home" className="nav-icon" />
          </Link>
        </div>

        {/* Right side (Saved Recipes) */}
        <div className="nav-right">
          <Link to="/saved">
            <img src={bookmark} alt="Saved Recipes" className="nav-icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
