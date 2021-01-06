import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DialogFavorit from './Dialog';

const SelectedFavorit =({selected, dialogOpen}) => {
  console.log(selected);
    const {loading, error, data} = useQuery(
        GET_CHOOSEN_DATA, {
            variables: {id: selected}
        }
    );


    if(loading)
        return <p>Loading artist...</p>
    if(error)
        return <p>Error...</p>
    if(data !== null) {
        console.log(data);
    }
    
    return(
      <div></div>
        //<DialogFavorit selected = {selected} dialogOpen = {dialogOpen} />
        )
}

export default SelectedFavorit;

const GET_CHOOSEN_DATA =  gql`
query GetChoosenData($id : ID!) {
    artists(where: {id: $id} ){
        ...on Artist {
          id
          slug
          name
          artistImage {
            url
          }
        }
    }
    albums(where: {id: $id} ) {
      ...on Album {
        id
        slug
        albumName
        albumImage {
          url
        }
      }
    }
    songs(where: {id: $id} ) {
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
`;

