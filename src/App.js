import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {Home} from "./pages/Home";
import {Navbar} from "./components/Navbar";
import {CategoryDetail} from "./pages/CategoryDetail";
import {DjserverState} from "./context/djangoserver/djserverState";
import {Alert} from './components/Alert';
import {AlertState} from "./context/alert/AlertState";
import {AuthState} from "./context/auth/authState";


function App() {
  return (
      <AuthState>
        <DjserverState>
          <AlertState>
            <BrowserRouter>
              <Navbar/>
              <div className="container pt-xl-5">
                <Alert/>
                <Switch>
                  <Route exact path={'/'} component={Home}/>
                  <Route exact path={'/login'} component={Login} />
                  <Route exact path={'/signup'} component={Signup} />
                  <Route exact path={'/category/:id'} component={CategoryDetail}/>
                </Switch>
              </div>
            </BrowserRouter>
          </AlertState>
        </DjserverState>
      </AuthState>
  );
}

export default App;
