import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/todos"
            element={cookies.access_token ? <Todo /> : <Auth />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
