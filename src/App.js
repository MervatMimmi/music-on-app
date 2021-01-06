import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppbarDrawer from './components/Appbar';
import Home from './components/Home';
import Artist from './components/Artist';
import './App.css';



const App = () => {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);



  return (
      <div>
          <Router>
          <AppbarDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose = {handleDrawerClose} />
              <Switch>

                    <Route exact path={["/", "/home"]} >
                      <Home open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

                    <Route path="/artist/:slug" >
                      <Artist  open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

                    <Route path="/artist/album/:slug" >
                      <Artist  open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>


              </Switch>
          </Router>
      </div>
  )
};

export default App;