import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div>
      {page === "landing"   && <LandingPage setPage={setPage} />}
      {page === "login"     && <Login setPage={setPage} />}
      {page === "signup"    && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
    </div>
  );
}