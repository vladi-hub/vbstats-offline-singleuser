import React, { Component } from "react";


import { makeStyles } from "@mui/styles";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import ForgetPassword from "./components/forgetpass.component";

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
import InputTwoToneIcon from '@mui/icons-material/InputTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

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
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
	  console.log(">>>>>>>>>>>>Logout callaed !!!")  
	  localStorage.clear();
	  window.location.href = "/login";
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
	          {currentUser ? (
	        		  <Nav.Link as={Link} to="/profile"><AccountCircleTwoToneIcon/> Profile</Nav.Link>		  
	          ) : (		  

	        		  <Nav.Link as={Link} to="/register"><GroupAddTwoToneIcon/> Sign Up</Nav.Link>
	            
	          )}
	          
	          {currentUser ? (	        		 
	        		 
	        		  <Nav.Link as={Link} to="/login" onClick={this.logOut}><LogoutTwoToneIcon/> LogOut</Nav.Link>		      
	          ) : (		  
	        		  <Nav.Link as={Link} to="/login"><InputTwoToneIcon/> Login</Nav.Link>		  

	            
	          )}
	          </Nav>
	          	</Navbar.Collapse>
	          	
	          	
	          </Navbar>
	          </Container>
	         
	        <div className="container mt-3">
	          <Switch>
	           
	            <Route exact path={["/", "/home"]} component={Home} />
	            <Route exact path="/login" component={Login} />
	            <Route exact path="/register" component={Register} />
	            <Route exact path="/profile" component={Profile} />
	          
	            <Route path="/editteam" component={TeamRoster} />
	            <Route path="/editgame" component={GameRoster} /> 
	            <Route path="/choosegame" component={ChooseGame} />		
	            <Route path="/allinboard" component={AllInBoard} />
	            <Route path="/reports" component={Dashboard} />
	            <Route path="/forgotpass" component={ForgetPassword} />
	          </Switch>
	        </div>
	      </div>
	      
	      
	    );
  }
}

export default App;