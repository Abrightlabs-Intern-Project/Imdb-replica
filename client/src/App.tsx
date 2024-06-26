import { Routes, Route } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
// import Watchlist from "./pages/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
//@ts-ignore
import awsExports from "./aws-exports";
import Review from "./pages/Review";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { components, theme } from "./cognito/config";
import { signOut } from "aws-amplify/auth";
import MovieFiltering from "./pages/MovieFiltering";
import axios from "axios";
import Watchlist from "./pages/Watchlist"
import MovieForm from "./pages/AddMovie";
import RemoveMovie from "./pages/RemoveMovie";

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
        userId: user.userId
      };
      const response = await axios.post("http://localhost:3000/user/login", loginData);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [user]);

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
        <Route path="/movie/add" element={<MovieForm />} />
        <Route path="/movie/remove" element={<RemoveMovie/>} />
      </Routes>
      <Footer />
    </WatchlistProvider>
  );
};

export default MainApp;
