import { Routes, Route } from "react-router-dom";
import { FC, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { api_url, WatchlistProvider } from "./context/WatchlistContext";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
// @ts-ignore
import awsExports from "./aws-exports";
import Review from "./pages/Review";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { components, theme } from "./cognito/config";
import axios from "axios";
import Watchlist from "./pages/Watchlist";
import AddMovie from "./pages/admin/AddMovie";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/admin/Admin";
import EditMovie from "./pages/admin/EditMovie";
import MyReviews from "./pages/MyReviews";
import ActorDetails from "./pages/ActorDetails";
import withAdminCheck from "./pages/admin/withAdminCheck";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import GenreFiltering from "./pages/GenreFiltering";
import AdvancedFiltering from "./components/filters/AdvancedFiltering";
import PageNotFound from "./pages/PageNotFound";

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
      console.log(`${api_url}/user/login`)
      await axios.post(`${api_url}/user/login`, loginData);
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
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id/review" element={<Review />} />
        <Route path="/genre-filter" element={<GenreFiltering />} />
        <Route path="/advanced-filter" element={<AdvancedFiltering />} />
        <Route path="/movie/:id/review/redirect" element={<ThankYou />} />
        <Route path="/movie/add" element={<AddMovie />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />

        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/admin/add" element={<AddMovieComponent />} />
        <Route path="/admin/edit/:id" element={<EditMovieComponent />} />
      </Routes>
      <Footer />
    </WatchlistProvider>
  );
};

export default MainApp;
