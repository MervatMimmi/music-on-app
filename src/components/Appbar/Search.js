import React, { useEffect, useState } from 'react';
import { useLazyQuery, gql} from '@apollo/client';


const SEARCH_DATA = gql`
query findDataBySlug($slug: String!) {
    findData(slug: $slug) {
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
 
const Search = ({slugs}) => {
    const [getData, result] = useLazyQuery(SEARCH_DATA)
    const[data, setData] = useState(null);

    const showSlug =(slug) => {
        getData({ variables: {slug: slug} })
    }

    useEffect(() => {
        if(result.data) {
            setData(result.data.findData)
        }
    }, [result])

    if(data) {
        console.log(data)
    }

    return (
        <div>
          
        </div>
      )
    }


export default Search;