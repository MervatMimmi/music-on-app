import React from 'react';
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, FormControlLabel, Divider} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import logo from '../../Image/logo.jpg';
import SelectedFavorit from '../Favorits';
import React, { useEffect, useState } from 'react';
import { useQuery, gql }  from '@apollo/client';
import AlbumList from './AlbumList';
import { getDefaultValues } from '@apollo/client/utilities';


export default function Album() {
    const { loading, error, data } = useQuery(ALL_ALBUM_DATA);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getData();
    })

    const getData = () => {
        if(loading)
            return <p>Loading album...</p>
        if(error)
            return <p>Error...</p>
        if(data) {
            console.log(data.album);
        }
    }

    return (
        <AlbumSongList results = {results} />
    )
}

const ALL_ALBUM_DATA = gql`
query GetAllAlbumData {
    album {
        id
        slug
        albumName
        AlbumImage {
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