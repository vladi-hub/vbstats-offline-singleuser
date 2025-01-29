/**
 * http://usejsdoc.org/
 */
import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import PlayerDataService from "../../services/player.service";
import GameDataService from "../../services/game.service";
import StatsDataService from "../../services/stats.service";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PictureInPictureTwoToneIcon from '@mui/icons-material/PictureInPictureTwoTone';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

}));


export default class TeamRoster extends Component {
  constructor(props) {
   super(props);

   this.renderFormGroups = this.renderFormGroups.bind(this);
   this.renderNewPlayerForm = this.renderNewPlayerForm.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handleClickNewPlayer = this.handleClickNewPlayer.bind(this);
   this.handleClickDelete = this.handleClickDelete.bind(this);	

   this.state = {
      rows: null
   };

  }

  componentDidMount() {
	this.reloadData();
  }

  reloadData(){
	setTimeout(() => {
		this.setState({
			rows: null
		});
	  },1000);
	
	 var data = PlayerDataService.getAllPlayers();
	 //console.log("--------------------------:" + JSON.stringify(data) + " : size:"+data.length);
	 if(data){
		let rowz = new Map();
		data = JSON.parse(data);
		for (let i = 0; i < Object.keys(data.players).length; i++) {
			let playerId = data.players[i].id;
			let name = data.players[i].name;
			let number = data.players[i].number;
			let position = data.players[i].position;
			rowz.set(i,{'id' : playerId, 'name' : name, 'position' : position, 'number' : number});
		}

		setTimeout(() => {
			this.setState({
				rows: rowz
			});
		  },1000); 
	}
  }
  
  handleClickDelete(e) {
    //event.preventDefault();
	let playerId = 0;
    let i = 0;
    for(i =0; i < e.target.form.length; i++){
    	if(e.target.form[i].checked) {
    		playerId = e.target.form[i].id;
    	}
    }
    PlayerDataService.delete(playerId);
	this.setState({
		message: "Player deleted successfully!"
	});	      
		this.reloadData(1);    
  }
  
  handleClick(e) {
    let playerId = 0;
    let i = 0;
    let data = {}
    for(i =0; i < e.target.length; i++){
    	if(e.target[i].checked) {
    		playerId = e.target[i].id;
    		data = {
    	    	    name: e.target[i+1].value,
    	    	    number: e.target[i+3].value,
    	    	    position: e.target[i+5].value
    	    	  };
    	}
    }
    PlayerDataService.update(playerId, data);
    StatsDataService.updatePlayerName(playerId,data);
	this.setState({
		message: "Player updated successfully!"
	});	      
	this.reloadData(1);    
  }
  
  handleClickNewPlayer(e){
	  //console.log("-----"+userId); 
	  const data = {
	    name: e.target[0].value,
	    number: e.target[2].value,
	    position: e.target[4].value
	  };
	  let data2 = PlayerDataService.create(data);
	  let playerId = data2.id;
	this.setState({
		message: "Player was addedd successfully!"
	}); 	    
	var data3 = GameDataService.getAllPerUser(1);
	if(data3){
		data3 = JSON.parse(data3);
		for (let i = 0; i < Object.keys(data3.games).length; i++) {
			let playerId = data2.id;
			let name = e.target[0].value;
			let number = e.target[2].value;
			let position = e.target[4].value;
			console.log("=========player:" + name+":" + position +":" + playerId);
			const statsDat = {
				b_error: 0,
				b_touch: 0,
				b_block: 0,
				b_success: 0,
				playerId: playerId,
				gameId: data3.games[i].id,
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
	}
		 
     this.reloadData(1);
			               
  }
  
  renderNewPlayerForm = () => {
	  return  (
	        	<form onSubmit={this.handleClickNewPlayer} className={useStyles.root} noValidate autoComplete="off">
	        	  <div className="form-group"> 

	        	  <BadgeTwoToneIcon/><TextField required  id="outlined-basic" label="Player Name" variant="outlined"/> 
	               
	                <NumbersTwoToneIcon/> <TextField required id="outlined-basic" label="Player Number" variant="outlined"/>         
	                	
		                <PictureInPictureTwoToneIcon/>
						 <Select
		                labelId="demo-simple-select-label"
		                    id="demo-simple-select"
		                    defaultValue={'S'}
		                    label="Player Position" variant="outlined"
		                  >
		                    <MenuItem value={'S'}>S</MenuItem>
		                    <MenuItem value={'MH'}>MH</MenuItem>
		                    <MenuItem value={'OH'}>OH</MenuItem>
		                    <MenuItem value={'RS'}>RS</MenuItem>
		                    <MenuItem value={'DS'}>DS</MenuItem>
		                    <MenuItem value={'L'}>L</MenuItem>
		                  </Select>        

	                	</div>
	        	  <div className="form-group">
	              <button className="btn btn-primary btn-block"><PersonAddAlt1Icon/> Add Player</button>
	              </div> &nbsp;
	  		</form>
	          )
	
  
	} 


  renderFormGroups = () => {
	let data = null;
	if(this.state.rows) {
       data = Array.from(this.state.rows);
      // Here we build the form's groups elements dynamically
      return data.map(group => {
          return  (<div className="form-group" key={group[1].id}>
            <React.Fragment key={group[1].id}>
            <SportsHandballIcon/>
            <Checkbox id={group[1].id.toString()} inputProps={{ 'aria-label': 'description' }} />
                <TextField defaultValue={group[1].name} inputProps={{ 'aria-label': 'description' }} id="outlined-basic" label="Player Name" variant="outlined"/>
                <TextField defaultValue={group[1].number} inputProps={{ 'aria-label': 'description' }} id="outlined-basic" label="Player Number" variant="outlined"/>
                <Select
	                labelId="demo-simple-select-label"
	                    id="demo-simple-select"
	                    defaultValue={group[1].position}
	                    label="Player Position" variant="outlined"
	                  >
	                    <MenuItem value={'S'}>S</MenuItem>
	                    <MenuItem value={'MH'}>MH</MenuItem>
	                    <MenuItem value={'OH'}>OH</MenuItem>
	                    <MenuItem value={'RS'}>RS</MenuItem>
	                    <MenuItem value={'DS'}>DS</MenuItem>
	                    <MenuItem value={'L'}>L</MenuItem>
	                  </Select>        
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
	  return (
			<Paper className={useStyles.root}>
			<h2>Manage your players in the team </h2>
			<hr/>
				<form onSubmit={this.handleClick} className={useStyles.root} noValidate autoComplete="off">
					{this.renderFormGroups()}
				{this.state.message && (      
		                <div className="alert alert-primary" role="alert">
		                  {this.state.message}
		                </div>
		            )}	
		       
		        <div className="form-group">
	            	<button className="btn btn-primary btn-block"><UpgradeIcon/> Update</button>
	                 &nbsp;        
	        		<button className="btn btn-primary btn-block" onClick={this.handleClickDelete}><DeleteForeverIcon/> Delete</button>
		      </div>
		    </form>
		    <hr/>
	      	<h2>Add Player</h2>
			<hr/>
			{this.renderNewPlayerForm()}
			</Paper>
		);
	}
}