import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-[calc(100vh-225px)]">
        <ScrollToTop></ScrollToTop>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
