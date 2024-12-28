import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import PopupForm from "./components/shared/PopupForm";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/custom/ScrollToTop";
import Login from "./components/admin/Login";
import Signup from "./components/admin/Signup";

function App() {
  return (
    <>
      <h1 className="w-full font-Lato relative">
        <Header />
        <ScrollToTop/>
        <Outlet />
        <PopupForm />
        <Footer />
        <Toaster />
      </h1>
    </>
  );
}

export default App;