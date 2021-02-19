import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from "./pages/Home";
import {Navbar} from "./components/Navbar"
import {CategoryDetail} from "./pages/CategoryDetail";
import {DjserverState} from "./context/djangoserver/djserverState";
import {Alert} from './components/Alert'
import {AlertState} from "./context/alert/AlertState";

function App() {
  return (
        <DjserverState>
          <AlertState>
            <BrowserRouter>
              <Navbar/>
              <div className="container pt-xl-5">
                <Alert/>
                <Switch>
                  <Route path={'/'} exact component={Home}/>
                  <Route path={'/category/:id'} exact component={CategoryDetail}/>
                </Switch>
              </div>
            </BrowserRouter>
          </AlertState>
        </DjserverState>
  );
}

export default App;
