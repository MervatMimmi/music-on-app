import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import SingleSong from './SingleSong';


  
export default function Song() {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_SONG, {
            variables: {slug: slug}
        }
    );

    const handleSelected =(e, key) => {
        //console.log(key);
        let tempSelect = {...selected};
        tempSelect = e.target.value;
        //console.log( typeof tempSelect);
        setSelected(tempSelect);
        setDialogOpen(true);  
    }
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
    
     /*   const handleToggle = (e) => () => {
            console.log(e.target.value);
            setChecked(e.target.value);
            
        };*/

    console.log(results);
    
    return (
        <div>
            {loading || results.length === 0 ? 
                <h1>Loading Song...</h1> 
              :  <SingleSong 
                results = {results} 
                selected = {selected}
                dialogOpen ={dialogOpen} 
                handleSelected = {handleSelected}/>
            }
        </div>
       
    )
}
    


const GET_SINGLE_SONG = gql`
query GetSong($slug: String!) {
    song(where: {slug: $slug}) {
        id
        slug
        songTitle
        songFile {
          url
        }
        artists {
            ...on Artist {
                id
                slug
                name
                artistImage {
                    url
                }
            }
        }
    }
}
`;