import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, FormControlLabel} from '@material-ui/core';
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

export default function SingleAlbum({results, selected, dialogOpen, handleSelected}) {
    const classes = useStyles();

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
                                            alt = {results +1}
                                            src = {results.album.albumImage.url}
                                            />
                                        <ListItemText className = {classes.listItemHeaderText} 
                                            primary = {results.album.albumName}
                                            /> 
                                    </ListItem>
                                    {results.album.songs.map((song, id) => {
                                        const labelId = `checkbox-list-secondary-label-${song.songTitle}`;
                                        return (
                                                    <List key = {id} style = {{marginTop: '25px', marginBottom: '25px', paddingLeft: '60px' , display: 'flex', flexDirection: 'column'}}>
                                                        <ListItem button component = {Link} to ={ `/song/${song.slug}` }
                                                            className = {classes.albumTitle}>
                                                            <FormControlLabel
                                                                control = {
                                                                <Checkbox icon = {<FavoriteBorder />}
                                                                    checkedIcon = {<Favorite />}
                                                                    name = 'checked'/>}
                                                                    edge = 'start'
                                                                    value = {song.id}
                                                                    onChange = {handleSelected}
                                                                    />
                                                            <ListItemAvatar>
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
                                                                <audio controls>
                                                                <source src = {song.songFile.url}
                                                                        type = 'audio/mpeg' />
                                                                </audio> : null }
                                                        </ListItem>
                                                    </List>
                                                )
                                        })}
                                </List>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            {dialogOpen && <SelectedFavorit selected = {selected} dialogOpen = {dialogOpen} />}
        </main>
    )
}