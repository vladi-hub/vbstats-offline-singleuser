import React, { Component } from "react";
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import AuthService from "../../services/auth.service";
import GameDataService from "../../services/game.service";
import { DataGrid } from '@mui/x-data-grid';
import * as Constants from "../constants";
import { authMiddleWare } from '../../util/auth';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: ' Game Name ', width: 300 }
  
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 800
  },
  selectTableCell: {
    width: 300
  },
  tableCell: {
    width: 300,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));
  
export default class ChooseGame extends Component {
  
  constructor(props) {
    super(props);
    authMiddleWare(this.props.history);
    this.state = {
      content: "",
      rows: [],
      teamId: ""
    };
    this.handleClick = this.handleClick.bind(this);
    
    let currentUser = AuthService.getCurrentUser();
    let userId = currentUser.uid;

    GameDataService.getAllPerUser(userId).then(
      response => {
         setTimeout(() => {
          let rowz = new Array();
          //console.log("===================="+JSON.stringify(response.data));
          //console.log("===================="+JSON.stringify(response.data.name));
          //console.log("===================="+JSON.stringify(response.data.location));
          for (let i = 0; i < Object.keys(response.data).length; i++) {
            let gameId = response.data[i].id;
            let name = response.data[i].title;
            rowz[i] = {'id' : gameId,'name' : name, isEditMode: false};      
            //console.log("######### tourneyId :" + tourneyId +" | name :" +name + " | size :"+rowz.size);            
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
        this.setState({
            message: "Fetching games failed, please try again later!"
          });
      }
    );
  }

  handleClick(e) {
    //console.log("Tournament Id state : " + e.data.id);
    
    localStorage.setItem("gameId", e.id);
    let flow =  localStorage.getItem("flow");
    if (flow === "reports" ){
    	this.props.history.push("/reports");
    } else {
    	this.props.history.push("/allinboard");
    }
 
    window.location.reload();
  }

  shouldComponentUpdate() {
    return true;
  }

  render() { 
    return (
		<Paper className={useStyles.root}>
		<h2>Select game for which you like to add Stats</h2>
		<hr/>
		{this.state.message && (
	              <div className="form-group">
	                <div className="alert alert-danger" role="alert">
	                  {this.state.message}
	                </div>
	              </div>
	            )}
			<div style={{ height: 800, width: 800 }}>
				<DataGrid rows={this.state.rows} columns={columns} rowsPerPageOptions={[15,20,25]} pageSize={Constants.pageSize} onRowClick={this.handleClick}  />
			</div>
		</Paper>
	);
	}
}