import { Outlet } from "react-router-dom";
import './css/mainTemplate.css';

const MainTemplate = () => {
  return (
    <>
      <header>
        <h1>Humm.us is not for sale.</h1>
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