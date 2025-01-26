import React, { Component } from "react";


import { makeStyles } from "@mui/styles";
import { Link, Route, Switch } from "react-router-dom";

import Home from "./components/home.component";

import TeamRoster from "./components/team/teamroster.component";
import GameRoster from "./components/team/gameroster.component";

import Dashboard from "./components/reports/dashboard.component";
import ChooseGame from "./components/team/choosegame.component";
import AllInBoard from "./components/stats/allinpanel.component";

import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import SportsVolleyballTwoToneIcon from '@mui/icons-material/SportsVolleyballTwoTone';
import AddchartTwoToneIcon from '@mui/icons-material/AddchartTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import { Navbar, Nav, Container } from 'react-bootstrap';


const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  colornav: {
	 backgroundColor: rgb(153, 204, 255)
  }
}));

class App extends Component {

  constructor(props) {
    super(props);
  }


  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    //const { classes, theme } = this.props;
    const { currentUser } = this.state;
    
	    return (
	    <div>
	    <Container>
	    <Navbar expand="sm" bg="primary">
	    
	    	<Navbar.Toggle aria-controls="navbarSupportedContent" />
		        
	    	<Navbar.Collapse id="navbarSupportedContent">
	    	<Nav className="mr-auto">
	    		<Nav.Link as={Link} to="/home"><HomeTwoToneIcon/>Home</Nav.Link>
	    		<Nav.Link as={Link} to="/editteam"><Groups2TwoToneIcon/>Team Members</Nav.Link>
	            <Nav.Link as={Link} to="/editgame"><SportsVolleyballTwoToneIcon/>Games</Nav.Link>
	            <Nav.Link as={Link} to="/choosegame"><AddchartTwoToneIcon/>Stats</Nav.Link>	
	            <Nav.Link as={Link} to="/reports"><BarChartTwoToneIcon/>Reports</Nav.Link>
	            </Nav>
	            <Nav className="ml-auto">  
	          
	          </Nav>
	          	</Navbar.Collapse>
	          	
	          	
	          </Navbar>
	          </Container>
	         
	        <div className="container mt-3">
	          <Switch>
	           
	            <Route exact path={["/", "/home"]} component={Home} />
	          
	            <Route path="/editteam" component={TeamRoster} />
	            <Route path="/editgame" component={GameRoster} /> 
	            <Route path="/choosegame" component={ChooseGame} />		
	            <Route path="/allinboard" component={AllInBoard} />
	            <Route path="/reports" component={Dashboard} />
	          </Switch>
	        </div>
	      </div>
	      
	      
	    );
  }
}

export default App;