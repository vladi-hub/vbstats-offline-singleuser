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
import AuthService from "../../services/auth.service";
import { authMiddleWare } from '../../util/auth';
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
   authMiddleWare(this.props.history);
   this.renderFormGroups = this.renderFormGroups.bind(this);
   this.renderNewGameForm = this.renderNewGameForm.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.handleClickNewGame = this.handleClickNewGame.bind(this);
   this.handleClickDelete = this.handleClickDelete.bind(this);	
   let currentUser = AuthService.getCurrentUser();
   let userId = currentUser.uid;
   
   this.state = {
      content: "",
      rows: null
   };

   this.reloadData(userId);
  }

  reloadData(userId){
	  GameDataService.getAllPerUser(userId).then(
      response => {
         setTimeout(() => {
          let rowz = new Map();
          for (let i = 0; i < Object.keys(response.data).length; i++) {
            let gameId = response.data[i].id;
            let name = response.data[i].title;
            rowz.set(i,{'id' : gameId, 'userId' : userId,'name' : name});
          }
          this.setState({
            rows: rowz
          });
        },1000);
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
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
		authMiddleWare(this.props.history);
	    GameDataService.delete(gameId).then(
	    			  response => {
						  StatsDataService.deleteAllStats(gameId);						  
	    				  this.setState({
				              message: "Game deleted successfully!"
				            });
	    			      })
	    			      .catch(e => {
							  console.log(e);
	    			    	  this.setState({
	    			              message: "Game deletion failed, please try again later!"
	    			            });
	    			      });
	    	let currentUser = AuthService.getCurrentUser();
	   		let userId = currentUser.uid;		      
	    	this.reloadData(userId);		      
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
	authMiddleWare(this.props.history);
    GameDataService.update(gameId, data).then(
    			  response => {
    				  this.setState({
			              message: "Game updated successfully!"
			            });
    			      })
    			      .catch(e => {
    			    	  this.setState({
    			              message: "Game update failed, please try again later!"
    			            });
    			      });
    	let currentUser = AuthService.getCurrentUser();
   		let userId = currentUser.uid;		      
    	this.reloadData(userId);		      
  }
  
  handleClickNewGame(e){
	  let userId = AuthService.getCurrentUser().uid;
	  
	  const data = {
		userId: userId,
	    title: e.target[0].value
	  };
	  authMiddleWare(this.props.history);
	  GameDataService.create(data).then(
			  response => {
			        //console.log("===================== Create Game - ID :" + response.data.id);
			        this.setState({
			              message: "Game was created successfully!"
			            });
			        let gameId = response.data.id;
			        console.log("=========gameId:" + gameId);
			        PlayerDataService.getAllPerUser(userId).then(
						      response2 => {
						          for (let i = 0; i < Object.keys(response2.data).length; i++) {
						            let playerId = response2.data[i].id;
						            let name = response2.data[i].name;
						            let number = response2.data[i].number;
						            let position = response2.data[i].position;
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
						      },
						      error => {
						        this.setState({
							              message: "You need to add players first !"
							            });
			      })
			      .catch(e => {
			    	  this.setState({
			              message: "Fetching players list failed, please try again later!"
			            });
			      });
			  });
	  this.reloadData(userId);
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