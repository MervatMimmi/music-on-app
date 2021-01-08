import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import SingleArtist from './SingleArtist';


  
export default function Artist() {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_ARTIST, {
            variables: {slug: slug}
        }
    );

    useEffect(() => {
        getData();
    })

    const handleSelected =(e, key) => {
        //console.log(key);
        let tempSelect = {...selected};
        tempSelect = e.target.value;
        //console.log( typeof tempSelect);
        setSelected(tempSelect);
        setDialogOpen(true);  
    }

    const getData = () => {
        if(error)
            return <p>Error...</p>
        if(data) {
            return setResults(data);
          
        }
    }

    console.log(results);
    
     /*   const handleToggle = (e) => () => {
            console.log(e.target.value);
            setChecked(e.target.value);
            
        };*/
    
    return (
        <div>
            {loading || results.length === 0 ? 
                <h1>Loading Artist...</h1> 
              :  <SingleArtist 
                results = {results} 
                selected = {selected}
                dialogOpen ={dialogOpen} 
                handleSelected = {handleSelected}/>
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