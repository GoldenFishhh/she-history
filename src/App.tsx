import { Outlet } from "react-router-dom";
import { TimelineProvider } from "./context/TimelineContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <TimelineProvider>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </TimelineProvider>
  );
}
