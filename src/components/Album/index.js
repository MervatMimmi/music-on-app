import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import SingleAlbum from './SingleAlbum';


  
export default function Album() {
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_ALBUM, {
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
                <h1>Loading Album...</h1> 
              :  <SingleAlbum 
                results = {results} 
                selected = {selected}
                dialogOpen ={dialogOpen} 
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