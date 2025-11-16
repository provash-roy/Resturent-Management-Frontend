import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();

  // যেসব পেজে header/footer hide করতে চাও
  const noHeaderFooter = ["/login", "/register", "/contact"].includes(
    location.pathname
  );

  return (
    <div>
      {!noHeaderFooter && <NavBar />}

      <Outlet />

      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
