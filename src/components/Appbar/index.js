import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppDrawer from './AppDrawer';
import Appbar from './Appbar';


const AppbarDrawer = ({open, handleDrawerOpen, handleDrawerClose}) => {

  return (
    <div>
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose = {handleDrawerClose}/>
      <AppDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
    </div>
  )
}

export default AppbarDrawer;
