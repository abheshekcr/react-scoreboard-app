import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';


var PLAYERS=[
    {
      name:"abhe",
      score:34,
      id:1
    },
  
    {
      name:"kiran",
      score:23,
      id:2
    },
  
    {
      name:"ranga",
      score:56,
      id:3
    },
  
    {
      name:"radha",
      score:67,
      id:4
    }
  ];
    


ReactDOM.render(<App initialPlayers={PLAYERS}/>, document.getElementById('root'));
registerServiceWorker();





