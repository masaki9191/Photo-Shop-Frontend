import './scss/style.scss';
import React from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from './Routes';

const Routing = () => {
  let routing = useRoutes(routes);
  return(routing)
}

const App = () => {  
  return(
    <Router>
      <Routing />
    </Router>
  )
}

export default App
