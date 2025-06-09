import { Outlet } from "react-router-dom";

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