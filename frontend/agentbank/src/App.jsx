import "./App.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <main id="main" className="main">
        <Routes>
          <Route path="/" element={<Home />} errorElement={<Error />} />
          <Route
            path="/sign-in"
            element={<SignIn />}
            errorElement={<Error />}
          />
          <Route path="/user" element={<User />} errorElement={<Error />} />
          <Route path="/*" element={<Error status="" message="" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
