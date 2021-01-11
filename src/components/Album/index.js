import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import SingleAlbum from './SingleAlbum';


  
export default function Album() {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_ALBUM, {
            variables: {slug: slug}
        }
    );

    const [addArtist, {addData}] = useMutation(GET_CHOOSEN_DATA);
    const [addPublish, {newData}] = useMutation(PUBLISH_LIST);

    useEffect(() => {
        getData();
    })

    const getData = () => {
        if(error)
            return <p>Error...</p>
        if(data) {
            return setResults(data);
          
        }
    }

    const handleSelected =(e, key) => {
        //console.log(key);
        let tempSelect = {...selected};
        tempSelect = e.target.value;
        //console.log( typeof tempSelect);
        addArtist({variables: {favoriteId : tempSelect}}) 
        addPublish({variables: {favoriteId: e.target.value}})
        setSelected(tempSelect);
    }

    //console.log(results);

    return (
        <div>
            {loading || results.length === 0 ? 
                <h1>Loading Album...</h1> 
              :  <SingleAlbum 
                results = {results} 
                selected = {selected}
                handleSelected = {handleSelected}/>
            }
        </div>
       
    )
}


const GET_SINGLE_ALBUM = gql`
query SingleAlbum($slug: String!) {
    album(where: {slug: $slug}) {
        id
        slug
        albumName
        albumImage {
          url
        }
        songs {
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

const GET_CHOOSEN_DATA =  gql`
    mutation MyMutation($favoriteId: String!) {
        createFavoriteList(data: {favoriteId: $favoriteId}) {
            favoriteId
      }
  }
`;

const PUBLISH_LIST = gql`
    mutation MyLoading($favoriteId : String!) {
        publishFavoriteList(where: {favoriteId: $favoriteId}, to: PUBLISHED){
            favoriteId
          }
  }
`;