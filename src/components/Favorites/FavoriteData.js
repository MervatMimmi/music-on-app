import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import FavoriteList from './FavoriteList';

export default function FavoriteData({results}) {
    const [favoriteData, setFavoriteData] = useState([]);
    const { loading, error, data } = useQuery(
        GET_FAVORITE_DATA, {
            variables: {list: results }
        }
    );

    useEffect(() => {
        getData();
    })

    const getData = () => {
        if(error)
            return <p>Error...</p>
        if(data) {
            console.log(data);
            return setFavoriteData(data); 
        }
    }
    return (
        {/*<FavoriteList favoriteData  = {favoriteData} loading = {loading}/>*/}
    )
}


const GET_FAVORITE_DATA =  gql`
    query GetSearchData($list : ID!) {
        artists(where: {id: $list}) {
            ...on Artist {
                id
                slug
                name
                artistImage {
                    url
                }
            }
        }
        albums(where: {id: $list}) {
            ...on Album {
                id
                slug
                albumName
                albumImage {
                    url
                }
            }
        }
        songs(where: {id: $list}) {
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