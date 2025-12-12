import { Outlet, Link } from "react-router-dom";
import './css/mainTemplate.css';

const MainTemplate = () => {
  return (
    <>
      <header>
        <Link to="/">
          <h1>
            <span className="site-name">Humm.us</span>
            <span className="site-tagline">Is Not For Sale</span>
          </h1>
        </Link>
      </header>
      <div id="content">
        <Outlet />
      </div>
      <footer>
        <p>© 2024 Modal PDX. All rights reserved.</p>
      </footer>
    </>
  );
}

export default MainTemplate;