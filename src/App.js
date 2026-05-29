import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Events from "./pages/Events";

import AddEvent from "./pages/AddEvent";

import UpdateEvent from "./pages/UpdateEvent";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/add-event"
          element={<AddEvent />}
        />

        <Route
          path="/update-event/:id"
          element={<UpdateEvent />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;