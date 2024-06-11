import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
      rated
      released
      runtime
      genre
      director
      writer
      actors
      plot
      language
      country
      awards
      poster
      metascore
      imdbRating
      imdbVotes
      imdbID
      type
      dvd
      boxOffice
      production
      website
      response
    }
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($imdbID: String!, $userEmail: String!) {
    addToWatchlist(imdbID: $imdbID, userEmail: $userEmail) {
      title
    }
  }
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($imdbID: String!, $userEmail: String!) {
    removeFromWatchlist(imdbID: $imdbID, userEmail: $userEmail)
  }
`;

export const GET_WATCHLIST = gql`
  query GetWatchlist($userEmail: String!) {
    getWatchlist(userEmail: $userEmail) {
      imdbID
      title
      year
      rated
      released
      runtime
      genre
      director
      writer
      actors
      plot
      language
      country
      awards
      poster
      ratings
      metascore
      imdbRating
      imdbVotes
      type
      dvd
      boxOffice
      production
      website
      response
    }
  }
`;
