import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, 
        ListItemText, ListItemSecondaryAction, Checkbox, 
        FormControlLabel 
        } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import logo from '../../Image/logo.jpg';


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
    list : {
        marginTop: '25px', 
        marginBottom: '25px', 
        paddingLeft: '40px', 
        paddingRight: '40px', 
        display: 'flex', 
        flexDirection: 'column',
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

export default function SingleArtist({results, selected, handleSelected}) {
    const classes = useStyles();

    return (
        <main >
            <div className={classes.toolbar} />
            <Grid container item xs={12} justify="center">
                <Grid container item xs={12} spacing={6} className = {classes.grid} >
                    <Grid container item xs = {12}  >
                        <Grid item xs = {12} lg>
                            <List dense className = {classes.root}>
                                
                                <ListItem dense className = {classes.listItemHeader}>
                                    <Avatar className = {classes.large}
                                        variant="square"
                                        width = 'auto'
                                        height = '100%'
                                        alt = {results +1}
                                        src = {results.artist.artistImage.url}
                                        />
                                    <ListItemText className = {classes.listItemHeaderText} 
                                       primary = {results.artist.name}
                                        /> 
                                </ListItem>
                                
                               {results.artist.albums.length >= 1 ? results.artist.albums.map((album, id) => {
                                   //console.log(album.id);
                                   const labelId = `checkbox-list-secondary-label-${album.albumName}`;
                                    return (
                                        <List key = {id} className = {classes.list}>
                                            <ListItem button component = {Link} to ={`/album/${album.slug}`} 
                                                className = {classes.albumTitle}>
                                                <ListItemAvatar style = {{paddingLeft: '48px'}}>
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
                                                <ListItemSecondaryAction >
                                                    <FormControlLabel
                                                        control = {
                                                            <Checkbox icon = {<FavoriteBorder />}
                                                                checkedIcon = {<Favorite />}
                                                                name = 'checked'/>}
                                                                edge = 'start'
                                                                value = {album.id}
                                                                onChange = {handleSelected}
                                                                />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                     </List>
                                    )
                                }) : null}

                                 {results.artist.songs.length >= 1 ? results.artist.songs.map((song, id) => {
                                   //console.log(album.id);
                                   const labelId = `checkbox-list-secondary-label-${song.songTitle}`;
                                    return (
                                        <List key = {id} className = {classes.list}>
                                            <ListItem button component = {Link} to ={`/song/${song.slug}`} 
                                                className = {classes.albumTitle}>
                                                <ListItemAvatar style = {{paddingLeft: '48px'}}>
                                                    <Avatar 
                                                        alt = {song + 1}
                                                        src = {logo}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText id = {labelId}
                                                        className = {classes.listItemHeaderText} 
                                                        primary = {song.songTitle}
                                                />
                                                {song.songFile ? 
                                                    <div style = {{marginLeft: '-25px'}}>
                                                        <audio controls>
                                                            <source src = {song.songFile.url}
                                                                    type = 'audio/mpeg' />
                                                        </audio> 
                                                    </div>
                                                : null }
                                                
                                                <ListItemSecondaryAction>
                                                    <FormControlLabel
                                                        control = {
                                                            <Checkbox icon = {<FavoriteBorder />}
                                                                checkedIcon = {<Favorite />}
                                                                name = 'checked'/>}
                                                                edge = 'start'
                                                                value = {song.id}
                                                                onChange = {handleSelected}
                                                                />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                     </List>
                                    )
                                }) : null}
                                
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}

