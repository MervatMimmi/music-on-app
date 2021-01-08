import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusic from '@material-ui/icons/QueueMusic';



const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        backgroundColor: '#00587a'
    },

    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX: "hidden"
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: 0,
        border: 0,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: "90px",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    menuButton: {
        marginRight: 29,
    },
    textWhite: {
       color: '#e7e7de',
    }
    
})) 

const SideDrawer = (props) => {
    const { open } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            style={{overflow:"hidden"}}
            >
                <div className={classes.toolbar} >
                    {open ? <IconButton onClick={props.handleDrawerClose} className={classes.hoverEffect} >
                        <ChevronLeft fontSize="large" className={classes.textWhite} />
                    </IconButton>
                        : <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, classes.textWhite, classes.hoverEffect, {
                                [classes.hide]: open
                            })}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>}
                </div>

                <List className={classes.textWhite} style={{ marginTop: "40px" }}>

                    <NavLink exact activeClassName={classes.active} className="link" to={"/"} >
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "Home" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite} >
                                    <HomeIcon fontSize="large" />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="MusicON" className={classes.textWhite}/>
                        </ListItem>
                    </NavLink>

                    <NavLink activeClassName={classes.active} className="link" to="/something">
                        <ListItem button className={classes.hoverEffect}>
                            <Tooltip title={!open ? "List" : ""} placement="right" arrow>
                                <ListItemIcon className={classes.textWhite}>
                                    <QueueMusic fontSize="large" />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary="List" className={classes.textWhite} />
                        </ListItem>
                    </NavLink>

                </List>
            </Drawer>
        </React.Fragment>
    )
}

export default SideDrawer;
