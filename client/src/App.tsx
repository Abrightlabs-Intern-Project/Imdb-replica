import { Routes, Route } from "react-router-dom";
import { FC, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { WatchlistProvider } from "./context/WatchlistContext";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
// @ts-ignore
import awsExports from "./aws-exports";
import Review from "./pages/Review";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { components, theme } from "./cognito/config";
import MovieFiltering from "./pages/MovieFiltering";
import axios from "axios";
import Watchlist from "./pages/Watchlist";
import AddMovie from "./pages/admin/AddMovie";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/admin/Admin";
import EditMovie from "./pages/admin/EditMovie";
import MyReviews from "./pages/MyReviews";
import ActorDetails from "./pages/ActorDetails";
import withAdminCheck from "./pages/admin/withAdminCheck";

Amplify.configure(awsExports);

const MainApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator
        loginMechanisms={["username", "email"]}
        components={components}
      >
        {({ signOut, user }) => <App signOut={signOut} user={user} />}
      </Authenticator>
    </ThemeProvider>
  );
};

const App: FC<{ signOut: any; user: any }> = ({ signOut, user }) => {
  const handleLogin = async () => {
    try {
      const loginData = {
        userName: user.username,
        userId: user.userId,
      };
      await axios.post("http://localhost:3000/user/login", loginData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [user]);

  const AdminComponent = withAdminCheck(Admin);
  const AddMovieComponent = withAdminCheck(AddMovie);
  const EditMovieComponent = withAdminCheck(EditMovie);

  return (
    <WatchlistProvider>
      <Navbar signOut={signOut} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id/review" element={<Review />} />
        <Route path="/filter" element={<MovieFiltering />} />
        <Route path="/movie/:id/review/redirect" element={<ThankYou />} />
        <Route path="/movie/add" element={<AddMovie />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/actor/:id" element={<ActorDetails />} />

        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/admin/add" element={<AddMovieComponent />} />
        <Route path="/admin/edit/:id" element={<EditMovieComponent />} />
      </Routes>
      <Footer />
    </WatchlistProvider>
  );
};

export default MainApp;
