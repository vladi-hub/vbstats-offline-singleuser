/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Alert from '@mui/material/Alert';
import GameDataService from "../../services/game.service";
import PlayerDataService from "../../services/player.service";
import StatsDataService from "../../services/stats.service";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SportsVolleyballTwoToneIcon from '@mui/icons-material/SportsVolleyballTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default class GameRoster extends Component {
  constructor(props) {
   super(props);

   this.renderFormGroups = this.renderFormGroups.bind(this);
   this.renderNewGameForm = this.renderNewGameForm.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handleClickNewGame = this.handleClickNewGame.bind(this);
   this.handleClickDelete = this.handleClickDelete.bind(this);	
   this.state = {
	content: "",
	rows: null
 	};
  }

  reloadData(){
	var data = GameDataService.getAllPerUser(1);
    let rowz = new Map();
	for (let i = 0; i < Object.keys(response.data).length; i++) {
		let gameId = response.data[i].id;
		let name = response.data[i].title;
		rowz.set(i,{'id' : gameId, 'name' : name});
	}
	this.setState({
		rows: rowz
	});
   
  }



	handleClickDelete(e){
		event.preventDefault();
		let gameId = 0;
	    let i = 0;
	    for(i =0; i < e.target.form.length; i++){
	    	if(e.target.form[i].checked) {
	    		gameId = e.target.form[i].id;
	    	}
	    }
	    if(GameDataService.delete(gameId)){
			StatsDataService.deleteAllStats(gameId);						  
			this.setState({
				message: "Game deleted successfully!"
			});
		}	      
	    this.reloadData();		      
	}

  handleClick(e) {
	let gameId = 0;
    let i = 0;
    let data = {}
    for(i =0; i < e.target.length; i++){
    	if(e.target[i].checked) {
    		gameId = e.target[i].id;
    		data = {
    	    	    title: e.target[i+1].value
    	    	  };
    	}
    }
    if(GameDataService.update(gameId, data)){
		this.setState({
			message: "Game updated successfully!"
		  });
	}		      
    this.reloadData(1);		      
  }
  
  handleClickNewGame(e){
	  
	  const data = {
	    title: e.target[0].value
	  };
	  let gameId = GameDataService.create(data);
	  let data2 = PlayerDataService.getAllPlayers();
	  for (let i = 0; i < Object.keys(data2).length; i++) {
			let playerId = data2[i].id;
			let name = data2[i].name;
			let number = data2[i].number;
			let position = data2[i].position;
			console.log("=========player:" + name+":" + position +":" + playerId);
			const statsDat = {
				b_error: 0,
				b_touch: 0,
				b_block: 0,
				b_success: 0,
				playerId: playerId,
				gameId: gameId,
				name: name,
				number: number,
				position: position,
				d_missed: 0,
				d_touch: 0,
				d_success: 0,
				
				h_error: 0,
				h_kill: 0,
				h_total: 0,
				
				p_error: 0,
				p_poor: 0,
				p_keep: 0,
				p_perfect: 0,
				
				s_total: 0,
				s_ace: 0,
				s_error: 0
				}
				StatsDataService.create(statsDat);
									 
	 }
		this.setState({
			message: "Game was addedd successfully!"
		});
	  this.reloadData();
  }
  
  renderNewGameForm = () => {
	  return  (
	        	<form onSubmit={this.handleClickNewGame} className={useStyles.root} noValidate autoComplete="off">
	        	  <div className="form-group"> 
	               <BadgeTwoToneIcon/> <TextField required id="gameName" label="Game Name" variant="outlined"/> 
	              </div>
	        	  <div className="form-group">
	              <button className="btn btn-primary btn-block"><AddCircleIcon/> Add Game</button>
	              <Alert severity="info">You need to add players first!</Alert>
	              </div> &nbsp;
	  		</form>
	          )
	
  
	}


  renderFormGroups = () => {
    const data = Array.from(this.state.rows);
    console.log(data);
    if(data){
      // Here we build the form's groups elements dynamically
      return data.map(group => {
          return  (<div className="form-group" key={group[1].id}>
            <React.Fragment key={group[1].id}>
                <SportsVolleyballTwoToneIcon/>
            	<Checkbox name="id" id={group[1].id.toString()} inputProps={{ 'aria-label': 'description' }}/>
                <TextField defaultValue={group[1].name} inputProps={{ 'aria-label': 'description' }} id="gameName" label="Game Name" variant="outlined"/> 
            </React.Fragment>
                </div>
          )
      });
    }   
}

shouldComponentUpdate() {
	    return true;
}
  
render() {
  let jsondata = this.state.rows;
  if(jsondata){
	  return (
			<Paper className={useStyles.root}>
			<h2>Manage the games you would like to add stats for - current count: {this.state.rows.size}</h2>
			<hr/>
				<form onSubmit={this.handleClick} className={useStyles.root} noValidate autoComplete="off">
					{this.renderFormGroups()}
					{this.state.message && (
		              <div className="form-group">
		                <div className="alert alert-info" role="alert">
		                  {this.state.message}
		                </div>
		              </div>
		            )}
		        <div className="form-group">
	            	<button className="btn btn-primary btn-block"><UpgradeIcon/> Update</button>
	                 &nbsp;        
	        		<button className="btn btn-primary btn-block" onClick={this.handleClickDelete}><DeleteForeverIcon/> Delete</button>
	        		<Alert severity="info">Deleting game will delete the stats of that game too!</Alert>
		      </div>
		    </form>
		    <hr/>
	      	<h2>Add Game</h2>
			<hr/>
			{this.renderNewGameForm()}
			</Paper>
		);
  		} else {
  			return (<Paper className={useStyles.root}>
			<h2>Data is loading from the cloud ...</h2>
			<hr/>
			<CircularProgress />
			</Paper>);
  		}
	}
}