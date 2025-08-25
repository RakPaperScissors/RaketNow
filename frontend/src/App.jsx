import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import BottomNav from "./components/BottomNav";


import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";


// Pages
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Faqs from "./pages/Faqs";
import Home from "./pages/Home";
import ForYou from "./pages/ForYou";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";
import UserNotifications from "./pages/Notifications";
import BecomeRaketista from "./pages/BecomeRaketista";
import UserRakets from "./pages/MyRakets";
import BoostPost from "./pages/Boost";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/Applications";
import AdminUsersTable from "./pages/AdminUsersTable";
import ProfileDisplayCard from "./components/ProfileDisplayCard";
import ViewProfile from "./pages/ViewProfile";
import { View, WifiOff, LogOut } from "lucide-react";




function AuthGate({ children }) {
  const { user, loading, error, loggingOut } = useAuth();


  if (loading || loggingOut) {
    return <LoadingSpinner fullScreen />;
  }


  if (!user && !error) {
      return <LoadingSpinner fullScreen/>
  }


  if (!user && error) {
    const isConnectionError = !!error;


    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-6 text-center">
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            {isConnectionError ? (
              <WifiOff className="w-12 h-12 text-red-500" />
            ) : (
              <LogOut className="w-12 h-12 text-orange-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            {isConnectionError ? "Connection Lost" : "You are Logged Out"}
          </h1>


          <p className="text-gray-500 mb-6">
            {isConnectionError
              ? "We couldn't connect to the server. Please check your internet and try again."
              : "Your session has ended. Please log back in to continue."}
          </p>


          <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.href = "/login"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Go to Login
              </button>


              {isConnectionError && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Retry
                </button>
              )}
          </div>
        </div>


        <p className="mt-6 text-sm text-gray-400">
          Need help?{" "}
          <a href="/faqs" className="underline">
            Visit FAQs
          </a>
        </p>
      </div>
    );
  }


  return children;
}


function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;


  // will see header on these pages
  const showHeader = ["/", "/about", "/faqs"].includes(
    currentPath
  );


  // will see footer on these pages
  const showFooter = ["/", "/about", "/faqs"].includes(currentPath);


  // will see bottom nav on these pages (authenticated pages)
  const showBottomNav = [
    "/home",
    "/rakets",
    "/for-you",
    "/profile",
    "/message",
    "/notifications",
    "/become-raketista",
    "/my-rakets",
    "/boost",
    "/raket/:raketId/applications",
    "/profile-display/:userId",
    "/view-profile/:userId"
  ].some(path => {
    if (path.includes(':')) {
      // Handle dynamic routes
      const pathParts = path.split('/');
      const currentParts = currentPath.split('/');
      if (pathParts.length === currentParts.length) {
        return pathParts.every((part, index) =>
          part.startsWith(':') || part === currentParts[index]
        );
      }
      return false;
    }
    return currentPath === path;
  });


  return (
    <>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        {showHeader && <Header />}


        <Routes>
          {/* public pages -- LANDING */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* authenticated pages -- AFTER LOG IN */}
          <Route path="/home" element={<AuthGate> <Home /> </AuthGate>}/>
          <Route path="/rakets" element={<AuthGate> <ForYou /> </AuthGate>}/>
          <Route path="/for-you" element={<AuthGate> <ForYou /> </AuthGate>} />
          <Route path="/profile" element={<AuthGate> <ProfilePage /> </AuthGate>} />
          <Route path="/message" element={<AuthGate> <MessagePage /> </AuthGate>} />
          <Route path="/notifications" element={<AuthGate> <UserNotifications /> </AuthGate>} />
          <Route path="/become-raketista" element={<AuthGate> <BecomeRaketista /> </AuthGate>} />
          <Route path="/my-rakets" element={<AuthGate> <UserRakets /> </AuthGate>} />
          <Route path="/boost" element={<AuthGate> <BoostPost /> </AuthGate>} />
          <Route path="/raket/:raketId/applications" element={<AuthGate> <MyApplications /> </AuthGate>} />
          <Route path="/profile-display/:userId" element={<AuthGate> <ProfileDisplayCard /> </AuthGate>} />
          <Route path="/view-profile/:userId" element={<AuthGate> <ViewProfile /> </AuthGate>} />


          {/* admin page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users-table" element={<AdminUsersTable />} />
        </Routes>


        {showFooter && <Footer />}
        {showBottomNav && <BottomNav />}
      </Suspense>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;