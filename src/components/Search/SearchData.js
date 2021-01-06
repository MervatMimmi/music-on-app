import React, { useEffect, useState } from 'react';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import SearchPage from './SearchPage';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e7e7de'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}));
 
const SearchData = ({input, updateInput}) => {
    const [searchData, setSearchData] = useState([]);
    const classes = useStyles();
    const { error, data } = useQuery(
      GET_SEARCH_DATA, {
        variables: {search : input}
      }
    );

    useEffect(()=> {
        getData();
    })

    const getData = () => {
    if(error)
        return <p>Error...</p>
    if(data) {
        console.log(data);
        setSearchData(data);
        }
    }
    
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                value = {input}
                onChange = {updateInput}
                classes={{root: classes.inputRoot,
                input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            {searchData && <SearchPage  searchData = {searchData} /> }
        </div>

    )
}

export default SearchData;

const GET_SEARCH_DATA =  gql`
    query GetSearchData($search : String!) {
        artists(where: {name: $search}) {
            ...on Artist {
                id
                slug
                name
                artistImage {
                    url
                }
            }
        }
        albums(where: {albumName: $search}) {
            ...on Album {
                id
                slug
                albumName
                albumImage {
                    url
                }
            }
        }
        songs(where: {songTitle: $search}) {
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