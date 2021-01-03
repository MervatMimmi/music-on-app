import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Appbar from './components/Appbar';
import Home from './components/Home';
import Artist from './components/Artist';


const App = (props) => {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);

  return (
      <div >
          <Router>
              <Appbar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
              <Switch>

                    <Route exact path={["/", "/home"]} >
                      <Home open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

                    <Route path="/artist/:slug" >
                      <Artist  open={open} handleDrawerOpen={handleDrawerToggle} />
                    </Route>

              </Switch>
          </Router>
      </div>
  )
};

export default App;