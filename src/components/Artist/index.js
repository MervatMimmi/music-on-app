import React, {useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, FormControlLabel, Divider} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import logo from '../../Image/logo.jpg';
import SelectedFavorit from '../Favorits';

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
        padding: '75px',
        marginLeft: '200px',
        marginRight: '200px'
    },
    root: {
        flexGrow: 1,
        paddingTop: '0px',
        paddingBottom: '25px',
        boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.7)",
        [theme.breakpoints.down("xs")]: {
            boxShadow: "none",
        },
    },
    listItemHeader: {
        background: "rgb(230, 230, 230)",
        color: "rgb(128, 128, 128)",
        padding: "8px 12px",
        [theme.breakpoints.up("md")]: {
            paddingLeft: "340px",
        },
    },
    listItemHeaderText: {
        transition: "all 0.3s linear",
        maxWidth: "40ch",
        textAlign: 'center',  
        color: 'black', 
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    
  }));

  
export default function SingleArtist() {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const {slug} = useParams();
    const { loading, error, data} = useQuery(
        GET_SINGLE_ARTIST, {
            variables: {slug: slug}
        }
    );

    const handleSelected =(e, key) => {
        console.log(key);
        let tempSelect = {...selected};
        tempSelect = e.target.value;
        console.log( typeof tempSelect);
        setSelected(tempSelect);
        setDialogOpen(true);
        
    }

   /* useEffect(() => {
        getData();
    })

    const getData = () => {
        */
        if(loading)
            return <p>Loading artist...</p>
        if(error)
            return <p>Error...</p>
        if(data !== null) {
           // console.log(data.artist);
           // console.log(data.artist.songs);
        }
    
        /*const handleToggle = (e) => () => {
            console.log(e.target.value);
            setChecked(e.target.value);
            
        };*/
    
    return (
        <main >
            <div className={classes.toolbar} />
            <Grid container item xs={12} justify="center">
                <Grid container item xs={12} spacing={6} className = {classes.grid} >
                    <Grid container item xs = {12} >
                        <Grid item xs = {12} lg>
                            <List dense className = {classes.root}>
                               <ListItem dense className = {classes.listItemHeader}>
                                    <Avatar className = {classes.large}
                                        variant="square"
                                        width = 'auto'
                                        height = '100%'
                                        alt = {data +1}
                                        src = {data.artist.artistImage.url}
                                        />
                                    <ListItemText className = {classes.listItemHeaderText} 
                                       primary = {data.artist.name}
                                        /> 
                                </ListItem>
                               {data.artist.albums.length !== 0 ? data.artist.albums.map((album, id) => {
                                   //console.log(album.id);
                                   const labelId = `checkbox-list-secondary-label-${album.albumName}`;
                                    return (
                                        <List key = {id} style = {{marginTop: '25px', marginBottom: '25px', paddingLeft: '60px' , display: 'flex', flexDirection: 'column'}}>
                                            <ListItem //button component = {Link} to ={`/artist/album/${album.slug}`} 
                                                className = {classes.albumTitle}>
                                                <FormControlLabel
                                                    control = {
                                                        <Checkbox icon = {<FavoriteBorder />}
                                                            checkedIcon = {<Favorite />}
                                                            name = 'checked'/>}
                                                            edge = 'start'
                                                            value = {album.id}
                                                            onChange = {handleSelected}
                                                            //checked = {checked.indexOf(album) !== -1}
                                                            />
                                                <ListItemAvatar>
                                                    <Avatar 
                                                        variant = {album.albumImage ? 'square' : null}
                                                        className = {album.albumImage ? classes.large : null}
                                                        alt = {album + 1}
                                                        src = {album.albumImage ? album.albumImage.url : logo}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText id = {labelId}
                                                        className = {classes.listItemHeaderText} 
                                                        primary = {album.albumName}
                                                />
                                            </ListItem>
                                           
                                            {album.songs.map ((song, id) => {
                                                    //console.log(song);
                                                    return(
                                                        <ListItem key = {id}>
                                                            <FormControlLabel 
                                                                control = {
                                                                <Checkbox icon = {<FavoriteBorder />}
                                                                    checkedIcon = {<Favorite />}
                                                                    name = 'checked'/>}
                                                                    edge = 'start'
                                                                    value = {song.id}
                                                                    onChange = {handleSelected}
                                                                    //onChange = {handleToggle(song)}
                                                                    //checked = {checked.indexOf(song) !== -1}
                                                                    />
                                                            <ListItemAvatar>
                                                                <Avatar 
                                                                    alt = {song + 1}
                                                                    src = {logo}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText className = {classes.listItemHeaderText} 
                                                                    primary = {song.songTitle}
                                                            />
                                                            {song.songFile ? 
                                                                <audio controls>
                                                                <source src = {song.songFile.url}
                                                                        type = 'audio/mpeg' />
                                                                </audio> : null }
                                                        </ListItem>
                                                    )
                                                })} 
                                     </List>
                                    )
                                }) : 
                                data.artist.songs.map((song, id) => {
                                    console.log(data.artist.songs);
                                    const labelId = `checkbox-list-secondary-label-${song.songTitle}`;
                                    return(
                                        <ListItem key = {id}>
                                            <FormControlLabel 
                                                control = {
                                                <Checkbox icon = {<FavoriteBorder />}
                                                    checkedIcon = {<Favorite />}
                                                    name = 'checked'/>}
                                                    edge = 'start'
                                                    value = {song.id}
                                                    onChange = {handleSelected}
                                                    //onChange = {handleToggle(song)}
                                                    //checked = {checked.indexOf(song) !== -1}
                                                    />
                                            <ListItemAvatar>
                                                <Avatar 
                                                    alt = {song + 1}
                                                    src = {logo}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id = {labelId} className = {classes.listItemHeaderText} 
                                                    primary = {song.songTitle}
                                            />
                                            {song.songFile ? 
                                                <audio controls>
                                                <source src = {song.songFile.url}
                                                        type = 'audio/mpeg' />
                                                </audio> : null }
                                        </ListItem>
                                    )
                                })
                            }
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {dialogOpen && <SelectedFavorit selected = {selected} dialogOpen = {dialogOpen} />}
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