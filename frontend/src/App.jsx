import Footer from "./components/Footer";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Landing from "./pages/Landing";
import About from "./pages/About";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// Imports for API calls
import Users from "./pages/test_api_pages/Users";
import Login from "./pages/test_api_pages/Login";
import Home from "./pages/test_api_pages/Home";
import Profile from "./pages/test_api_pages/Profile";
import Rakets from "./pages/test_api_pages/Rakets";
import Raket from "./pages/test_api_pages/Raket";
import Signup from "./pages/test_api_pages/Signup";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/raket/:id" element={<Raket />} />
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
