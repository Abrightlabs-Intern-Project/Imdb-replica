import { gql } from '@apollo/client';

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
