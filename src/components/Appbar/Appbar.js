import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppDrawer from './AppDrawer';
import Header from './Header';
import Search from './Search';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
appBarShift: {
    [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}))

const Appbar = ({open}) => {
  const classes = useStyles();


  return(
    <div className = {classes.grow}>
      <AppBar className={clsx(classes.appBar, { [classes.appBarShift]: open })} style = {{background: '#0f3057'}} >
        <Toolbar>
          <Header title />
          <Search />
          <div className = {classes.section}/>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Appbar;