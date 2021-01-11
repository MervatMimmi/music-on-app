import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, 
        ListItemText, ListItemSecondaryAction, Checkbox, 
        FormControlLabel} from '@material-ui/core';
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

export default function SingleAlbum({results, selected, handleSelected}) {
    const classes = useStyles();
    
    const labelId = `checkbox-list-secondary-label-${results.song.songTitle}`;

    return (
        <main >
            <div className={classes.toolbar} />
            <Grid container item xs={12} justify="center">
                <Grid container item xs={12} spacing={6} className = {classes.grid} >
                    <Grid container item xs = {12} >
                        <Grid item xs = {12} lg>
                            <List dense className = {classes.root}>

                                <ListItem dense className = {classes.listItemHeader}>
                                    <ListItemAvatar>
                                        <Avatar className = {classes.large}
                                            variant = 'square'
                                            width = 'auto'
                                            height = '100%'
                                            alt = {logo + 1}
                                            src = {results.song ? results.song.artists[0].artistImage.url : null}
                                        />
                                    </ListItemAvatar>
                                    {results.song.artists[1] ? 
                                        <ListItemAvatar>
                                            <Avatar className = {classes.large}
                                                variant = 'square'
                                                width = 'auto'
                                                height = '100%'
                                                alt = {logo + 1}
                                                src = {results.song ? results.song.artists[1].artistImage.url : null}
                                            />
                                        </ListItemAvatar> : null }

                                        <ListItemText id = {labelId} 
                                            className = {classes.listItemHeaderText} 
                                            primary = {results.song.songTitle}
                                            secondary = {results.song.artists[1] ?  
                                                `${results.song.artists[0].name} with ${results.song.artists[1].name}`
                                                : results.song.artists[0].name}
                                        /> 
                                </ListItem>
                                <List className = {classes.list}>
                                    <ListItem className = {classes.albumTitle}>
                                        <ListItemAvatar style = {{paddingLeft: '48px'}}>
                                            <Avatar 
                                                alt = {results.song + 1}
                                                src = {logo}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            className = {classes.listItemHeaderText} 
                                            primary = {results.song.songTitle}
                                            />
                                        {results.song.songFile ? 
                                            <div style = {{marginLeft: '-25px'}}>
                                                <audio controls>
                                                    <source src = {results.song.songFile.url}
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
                                                        value = {results.song.id}
                                                        onChange = {handleSelected}
                                                    />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    )
}