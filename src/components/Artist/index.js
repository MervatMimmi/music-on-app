import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import SingleArtist from './SingleArtist';


export default function Artist() {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState('');
    const {slug} = useParams();
    const { error, data } = useQuery(
            GET_SINGLE_ARTIST, {
            variables: {slug: slug}
            }
        );
    const [addArtist, {addData, loading}] = useMutation(GET_CHOOSEN_DATA);
    const [addPublish, {newData}] = useMutation(PUBLISH_LIST);

    useEffect(() => {
        getData();
    })

    const getData = () => {
        if(error)
            return <p>Error...</p>
        if(data) {
            //console.log(data);
            return setResults(data); 
        }
    }

    const handleSelected =(e, key) => {
        e.preventDefault();
        //console.log(key);
        let tempSelect = {...selected};
        tempSelect = e.target.value;
        //console.log(tempSelect);
        addArtist({variables: {favoriteId : tempSelect}}) 
        addPublish({variables: {favoriteId: e.target.value}})
        setSelected(tempSelect);    
    }

    return (
        <div>
            {results.length === 0 ? 
                <h1>Loading Artist...</h1> 
              :  <SingleArtist 
                    results = {results} 
                    selected = {selected}
                    handleSelected = {handleSelected}
                    />
            }
        </div>
    )
}
    
const GET_SINGLE_ARTIST = gql` 
    query SingleArtist($slug: String!) { 
        artist(where: {slug: $slug}){ 
            id
            name
            slug
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