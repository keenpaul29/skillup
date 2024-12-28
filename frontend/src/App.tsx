import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/custom/ScrollToTop";

function App() {
  return (
    <>
      <h1 className="w-full font-Lato relative">
        <Header />
        <ScrollToTop/>
        <Outlet />
        <Footer />
        <Toaster />
      </h1>
    </>
  );
}

export default App;