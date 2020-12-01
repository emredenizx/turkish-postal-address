import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(  
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
