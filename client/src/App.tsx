import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
//@ts-ignore
import awsExports from "./aws-exports";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Review from "./pages/Review";

Amplify.configure(awsExports);

const App = () => (
  <Authenticator>
    <MainApp />
  </Authenticator>
);

const MainApp = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const handleLogin = async () => {
    if (user) {
      const email = user.signInDetails?.loginId;
      const response = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${email}`,
        },
        body: JSON.stringify({
          query: `
            mutation LoginUser($email: String!) {
              loginUser(email: $email) {
                id
                email
              }
            }
          `,
          variables: {
            email,
          },
        }),
      });
      // const { data } = await response.json();
      // console.log(data.loginUser);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [user]);

  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Page Not Found!</h1>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movie/:id/review" element={<Review />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WatchlistProvider>
  );
};

export default App;
