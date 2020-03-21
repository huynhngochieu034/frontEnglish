import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Vocabulary from './components/unit1/vocabulary';
import Practice from './components/unit2/unit2';
import Login from './components/users/login';
import Register from './components/users/register';
import Rank from './components/rank/rank';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="main-route-place">
            {/* <Route exact path="/" component={Vocabulary} />
            <Route path="/vocabulary" component={Vocabulary} />
            <Route path="/practice" component={Practice} /> */}
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/vocabulary" component={Vocabulary} />
            <Route path="/practice" component={Practice} />
            <Route path="/rank" component={Rank} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
