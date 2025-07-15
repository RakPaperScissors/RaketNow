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
import Login from "./pages/Login";
import Signup from "./pages/Signup";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
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
