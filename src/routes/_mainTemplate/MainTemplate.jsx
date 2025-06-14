import { Outlet } from "react-router-dom";
import './css/mainTemplate.css';

const MainTemplate = () => {
  return (
    <>
      <h1>Humm.us...which is not for sale.</h1>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}

export default MainTemplate;