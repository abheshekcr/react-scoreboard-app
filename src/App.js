import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import './App.css';



let nextId =5;

class StopWatch extends Component{

  constructor(props){
    super(props);
    this.state={
      running:false,
      elapsedTime:0,
      previousTime:0,
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.onTick,100);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  onStart=()=>{
    this.setState({
      running:true,
      previousTime:Date.now(),
    })
  }

  onTick =()=>{
    if(this.state.running){
      var now = Date.now();
      this.setState({
        previousTime:now,
        elapsedTime:this.state.elapsedTime +now - this.state.previousTime,
      });
    }
    console.log('ontick');
  }

  onStop =()=>{
    this.setState({running:false})
  }

  onReset =()=>{
    this.setState({
      elapsedTime:0,
      previousTime:Date.now()
    })
  }

  render(){
    var seconds = Math.floor(this.state.elapsedTime/1000);
    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">
         {seconds}
        </div>
       {this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button>}
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  } 
}

class AddPlayerForm extends Component{

  constructor(props){
    super(props);
    this.state={
      name:'',
    }
  }

  onSubmit =(e)=>{
    e.preventDefault();

 this.props.onAdd(this.state.name);
    this.setState({name:''});
  }

  onNameChange=(e)=>{
    this.setState({name:e.target.value});
  }


  render(){
    return(
      <div className="add-player-form">
          <form onSubmit={this.onSubmit}>
            <input type="text" value={this.state.name} onChange={this.onNameChange} />
            <input type="submit" value="Add player"/>
          </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes={
  onAdd:PropTypes.func.isRequired,
}



function Stats(props){

  var totalPlayers = props.players.length;
  var totalPoints =props.players.reduce((total,player)=>{
    return total+=player.score;
  },0);
  return(
    <table className="stats">
      <tbody>
        <tr>
          <td>Players</td>
          <td>{totalPlayers}</td>
          
        </tr>

        <tr>
          <td>Total points</td>
          <td>{totalPoints}</td>
          
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players :PropTypes.array.isRequired,
}

function Header(props){
  return(
    <div className="header">
      <Stats players={props.players}/>
    <h1>{props.title}</h1>
    <StopWatch/>
  </div>
  );
}


  var Counter = (props)=>{
    return(
      <div className="counter">
      <div className="counter-action decrement" onClick={()=>{props.onChange(-1)}}> - </div>
      <div className="counter-score">{props.score}</div>
      <div className="counter-action increment" onClick={()=>{props.onChange(1)}}> + </div>
   </div>
    );
  }

  Counter.propTypes ={
    score:PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired
  }



function Player(props){
  return(
    <div className="player">
    <div className="player-name">
      <a className="remove-player" onClick={props.onRemove}>X</a>
     {props.name}
    </div>

    <div className="player-score">
      <Counter score={props.score} onChange={props.onScoreChange}/>
    </div>
  </div>
  );
}

class App extends Component{

  constructor(props){
    super(props);
    this.state={players:this.props.initialPlayers}
  }

  onScoreChange =(delta,index)=>{
    var players = this.state.players;
    players[index].score += delta;
    this.setState({players: players});
  }

  onPlayerAdd=(name)=>{
    
    this.state.players.push({
      name:name,
      score:0,
      id:nextId,
    });
    this.setState(this.state);
    nextId+=1;
  }

  onPlayerRemove =(index)=>{
    this.state.players.splice(index,1);
    this.setState(this.state);
  }

  render(){
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
  
        <div className="players">
        {this.state.players.map((player,index)=>{
          return(
            <Player
            onScoreChange={(delta)=>{this.onScoreChange(delta,index)}}
            onRemove ={()=>{this.onPlayerRemove(index)}}
             name={player.name} 
          score={player.score} 
          key={player.id}/>
          );
        })}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  }
 
}

App.defaultProps ={
  title:"Scoreboard"
}
 
export default App;





  





