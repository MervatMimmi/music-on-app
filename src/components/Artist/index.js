import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, FormControlLabel } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: "90px",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    grid: {
        padding: '25px',
        marginLeft: '200px',
        marginRight: '200px'
    },
    root: {
        flexGrow: 1,
        boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.7)",
        [theme.breakpoints.down("xs")]: {
            boxShadow: "none",
        },
    },
    listItemHeader: {
        background: "rgb(230, 230, 230)",
        color: "rgb(128, 128, 128)",
        padding: "4px 12px",
        [theme.breakpoints.up("md")]: {
            //paddingLeft: "340px",
        },
    },
    listItemHeaderText: {
        transition: "all 0.3s linear",
        maxWidth: "40ch",
        textAlign: 'center',   
    },
  }));

  
export default function SingleArtist() {
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const [checked, setChecked] = useState([1]);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_ARTIST, {
            variables: {slug: slug}
        }
    );

    useEffect(() => {
        getData();
    })

    const getData = () => {
        if(loading)
            return <p>Loading artist...</p>
        if(error)
            return <p>Error...</p>
        if(data) {
            console.log(data.artist);
            setResults(data.artist);
        }
    }
    if(loading) return <p>Loading...</p>

        const handleToggle = (value) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
    
            if(currentIndex === -1) {
                newChecked.push(value);
            } else  {
                newChecked.splice(currentIndex, 1);
            }
            setChecked(newChecked);
        };
    
    return (
        <main>
            <div className={classes.toolbar} />
            <Grid container item xs={12} justify="center">
                <Grid container item xs={12} spacing={6} className = {classes.grid} >
                    <Grid container item xs = {12} >
                        <Grid item xs = {12} lg>
                            <List dense className = {classes.root}>
                                <ListItem dense className = {classes.listItemHeader}>
                                    <Avatar
                                        alt = {results.artist +1}
                                        src = {data.artist.artistImage.url}
                                        />
                                    <ListItemText className = {classes.listItemHeaderText} 
                                        primary = {data.artist.name}/> 
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </main>

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