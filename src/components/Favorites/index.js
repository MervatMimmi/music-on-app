import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import FavoriteData from './FavoriteData';


export default function Favorite() {
  const {loading, error, data} = useQuery(FAVORITE_ARRAY);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    getFavoriteArray();
  });

  const getFavoriteArray = () => {
    if(error)
      return <p>Error...</p>
    if(data) {
      //console.log(data);
      return setResults(data);
    }
  }

  return (
    <div>
      {loading || results.length === 0 
        ? <h1>Loading Favorite List...</h1>
        : <FavoriteData results = {results} />}
    </div>
  )
}

const FAVORITE_ARRAY = gql`
  query GetFavoriteArray {
    favoriteLists {
      favoriteId
    }
  }
`;


