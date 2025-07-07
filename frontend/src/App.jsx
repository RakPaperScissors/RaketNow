import Footer from "./components/Footer";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Imports for API calls
import Users from "./pages/test_api_pages/Users";
import Login from "./pages/test_api_pages/Login";
import Profile from "./pages/test_api_pages/Profile";
import Rakets from "./pages/test_api_pages/Rakets";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rakets" element={<Rakets />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
