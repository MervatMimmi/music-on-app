import React from 'react';
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
