import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';


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
        padding: '50px',
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
        padding: "4px 12px",
        
        [theme.breakpoints.up("sm")]: {
            paddingLeft: "260px",
            textAlign: 'center',
        },
    },
    listItemHeaderText: {
        transition: "all 0.3s linear",
        maxWidth: "200px",
        textAlign: 'center',
        paddingLeft: '60px',
        color: 'black',
        '& .MuiTypography-body2': {
            fontSize : '18px',
            fontWeight: 'bold',
            textAlign: 'center'
        },
    },
  }));

export default function ArtistList({results, open}) {
    const classes = useStyles();
    //console.log(results);
    
    return (
        <main>
            <div className={classes.toolbar} />
            <Grid container item xs={12} justify="center">
                <Grid container item xs={12} spacing={6} className = {classes.grid} >
                    <Grid container item xs = {12} style = {{margin: '60px'}}>
                        <Grid item xs = {12} lg>
                            <List dense className = {classes.root}>
                                <ListItem dense className = {classes.listItemHeader}>
                                    <ListItemText className = {classes.listItemHeaderText} 
                                        primary = 'Artist List'
                                        variant = 'h6' 
                                        component = 'h5' /> 
                                </ListItem>
                                {results.artists.map((artist, id)  => {
                                    const labelId = `checkbox-list-secondary-label-${artist.name}`;
                                    return (
                                        <ListItem key = {id} button component = {Link} to ={`/artist/${artist.slug}`} style = {{marginTop: '25px', marginBottom: '25px', paddingLeft: '60px' }}>
                                            <ListItemAvatar>
                                                <Avatar 
                                                    alt={artist + 1}
                                                    src={artist.artistImage.url}
                                                />
                                            </ListItemAvatar>
                                        <   ListItemText id = {labelId} primary = {artist.name}/>
                                        </ListItem>
                                    )   
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    );
}

