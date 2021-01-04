import React, {useEffect, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import ArtistList from './ArtistList';
import { Height } from '@material-ui/icons';

export default function Home() {
  const { loading, error, data } = useQuery(ALL_ARTISTS);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getData();
  })

  const getData =() => {
  if(loading) 
      return <p>Loading artist...</p>
  if(error)
      return <p>Error ...</p>
  if(data) {
    console.log(data.artists);
    setResults(data.artists);
  }
}

  return (
        <ArtistList results = {results} />
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
         albumsSongs {
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
                }
              }
              ...on Song {
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


