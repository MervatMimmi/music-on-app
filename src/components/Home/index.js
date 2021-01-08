import React, {useEffect, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import ArtistList from './ArtistList';


export default function Home() {
  const { loading, error, data } = useQuery(ALL_ARTISTS);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getData();
  })

  const getData =() => {
  if(error)
      return <p>Error ...</p>
  if(data) {
    console.log(data);
    return setResults(data);
  } 
}

  return (
    <div>
      {loading || results.length === 0 
      ? <h1>Loading Artists...</h1> 
      : <ArtistList results = {results} /> }
    </div>
      
  )
}

const ALL_ARTISTS =  gql`
query GetAllArtists {
    artists {
        id
        slug
        name
        artistImage {
          url
        }
        albums {
              ...on Album {
                id
                slug
                albumName
                albumImage {
                  url
                }
                songs {
                  id
                  slug
                  songTitle
                  songFile {
                    url
                  }
                }
              }
            }
      songs {
            ... on Song {
              id
              slug
              songTitle
              songFile {
                url
              }
          }
        }
    }
}
`;


