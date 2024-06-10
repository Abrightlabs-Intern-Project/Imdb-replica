import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css"
//@ts-ignore
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator>
      <WatchlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>Page Not Found!</h1>} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </WatchlistProvider>
    </Authenticator>
  );
};

export default App;
