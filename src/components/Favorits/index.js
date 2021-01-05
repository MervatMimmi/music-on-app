import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DialogFavorit from './Dialog';

const SelectedFavorit =({selected, dialogOpen}) => {
    const Id = selected
    const {loading, error, data} = useQuery(
        GET_CHOOSEN_DATA, {
            variables: {id: Id}
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
        <DialogFavorit selected = {selected} dialogOpen = {dialogOpen} />
        )
}

export default SelectedFavorit;

const GET_CHOOSEN_DATA =  gql`
query GetChoosenData($id : uuid!) {
    artists(where: {id: { _eq: $id} }){
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

