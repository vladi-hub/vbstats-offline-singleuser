import React, { Component } from "react";
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import GameDataService from "../../services/game.service";
import { DataGrid } from '@mui/x-data-grid';
import * as Constants from "../constants";


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
    this.state = {
      rows: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  reloadData(){
    setTimeout(() => {
      this.setState({
        rows: null
      });
      },1000);
    var data = GameDataService.getAllPerUser(1);
    if(data){
      let rowz = new Array();
      data = JSON.parse(data);
      for (let i = 0; i < Object.keys(data.games).length; i++) {
        let gameId = data.games[i].id;
        let name = data.games[i].name;
        rowz[i] = {'id' : gameId,'name' : name, isEditMode: false};  
      }
      setTimeout(() => {
        this.setState({
          rows: rowz
        });
      },1000); 
    }
     
  }

    componentDidMount() {
      this.reloadData();
    }

  handleClick(e) { 
    let gameId = e.id;
    localStorage.setItem("gameId", gameId);
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