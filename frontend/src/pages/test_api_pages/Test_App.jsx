import Footer from "./components/Footer";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
// import About from "./pages/About";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
// import Faqs from "./pages/Faqs";
// import Home from "./pages/Home";

import Rakets from "./pages/test_api_pages/Rakets";
import Raket from "./pages/test_api_pages/Raket";
import Login from "./pages/test_api_pages/Login";
import Signup from "./pages/test_api_pages/Signup";
import Home from "./pages/test_api_pages/Home";
import Notifications from "./pages/test_api_pages/Notifications";
import Applications from "./pages/test_api_pages/Applications";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* <Route index element={<Landing />} /> */}
        <Route index element={<Landing />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/Faqs" element={<Faqs />} /> */}
        {/* only when api is connected na */}
        {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/rakets" element={<Rakets />} />
        <Route path="/rakets/:id" element={<Raket />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/raket-application" element={<Applications />} />
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
