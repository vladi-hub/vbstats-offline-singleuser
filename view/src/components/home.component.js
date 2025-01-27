/**
 * http://usejsdoc.org/
 */
import React, {Component} from 'react';
import { makeStyles } from '@mui/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import SportsVolleyballTwoToneIcon from '@mui/icons-material/SportsVolleyballTwoTone';
import AddchartTwoToneIcon from '@mui/icons-material/AddchartTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import LabelIcon from '@mui/icons-material/Label';

const useStyles = makeStyles((theme) => ({
	  root: {
	    width: '100%'
	  },
	  heading: {
	    fontSize: theme.typography.pxToRem(15),
	    fontWeight: theme.typography.fontWeightRegular,
	  },
	}));


export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      content: ""
    };

	//localStorage.clear();
  }
  
  
  render() {
    return (
    		<div className={useStyles.root}>
    		<h2>What is VolleyStats?</h2>
    		<p>
    		VolleyStats is a web & mobile app for tracking volleyball statistics (indoor and with some creativity sand) and reporting.<br/>
	          This service should help parents and coaches to track, plan and improve their teams or players/kids' game!<br/>
	          Data in sports is now the most important asset!	<br/>
	          <img src="vs_success.jpg" width="280" height="200"/>
	        </p>	  
        	  <b>Who can use this ? </b><br/>
        	  <LabelIcon/> Coaches<br/>
        	  <LabelIcon/> Parents<br/>
        	  <LabelIcon/> Players<br/>
        	  <LabelIcon/> Anybody<br/>
    		<Accordion>
    	        <AccordionSummary
    	          expandIcon={<ExpandMoreIcon />}
    	          aria-controls="panel1a-content"
    	          id="panel1a-header"
    	        >
    	          <Typography className={useStyles.heading}><PsychologyAltTwoToneIcon/> Why VolleyStats?</Typography>
    	        </AccordionSummary>
    	        <AccordionDetails>
    	          <Typography>
    	          Use the flow to set up your app and start tracking !<br/>
    	          <img src="vsflow.png" width="550" height="200"/>  
    	        	  <br/>
    	          <LabelIcon/>Identify team/players gaps and address them<br/>
    	          <LabelIcon/>Have it all in the cloud<br/>
    	          <b>How to use it ?</b><br/>
    	          <LabelIcon/> Sign up, figure out if the free version is enough<br/>
    	          <LabelIcon/> Add all the players you want to track statistics (if you are a parent can be just one)<br/>
    	          <LabelIcon/> Add all the games you want to track statistics; you can use meaning full names: XXTournamen_Game_1<br/>
    	          <LabelIcon/> Start tracking statistics (the most important step)<br/>
    	          <LabelIcon/> Once you have enough data check the cool reports<br/>
    	          </Typography>
    	        </AccordionDetails>
    	      </Accordion>
    	      
    	      <Accordion>
    	        <AccordionSummary
    	          expandIcon={<ExpandMoreIcon />}
    	          aria-controls="panel1a-content"
    	          id="panel1a-header"
    	        >
    	          <Typography className={useStyles.heading}><Groups2TwoToneIcon/>Team Roster</Typography>
    	        </AccordionSummary>
    	        <AccordionDetails>
    	          <Typography>
    	          <LabelIcon/>Build your team roster by adding player by player with their name, number, and position. 
    	          <i>There is no need to add them in a particular order - 
    	          you can drag and drop them on the stats and add a page to focus on players on the court.</i><br/>
    	          <LabelIcon/>You can update the player's information or delete players.
    	          
    	          You can only update players one by one, with no bulk updates.
    	          </Typography>
    	        </AccordionDetails>
    	      </Accordion>
    	      <Accordion>
    	        <AccordionSummary
    	          expandIcon={<ExpandMoreIcon />}
    	          aria-controls="panel2a-content"
    	          id="panel2a-header"
    	        >
    	          <Typography className={useStyles.heading}><SportsVolleyballTwoToneIcon /> Manage Games</Typography>
    	        </AccordionSummary>
    	        <AccordionDetails>
    	          <Typography>
    	          <LabelIcon/>Add games to be able to add statistics (they are per game); use the tournament schedule to add games as a naming convention 
    	          use tournament name or location and numbers, anything meaningful for you will work.<br/>
    	          
    	          <LabelIcon/>Games can be updated only one by one.
    	          </Typography>
    	        </AccordionDetails>
    	      </Accordion>
    	      
    	      <Accordion>
  	        <AccordionSummary
  	          expandIcon={<ExpandMoreIcon />}
  	          aria-controls="panel3a-content"
  	          id="panel3a-header"
  	        >
  	          <Typography className={useStyles.heading}><AddchartTwoToneIcon/>Manage Statistics</Typography>
  	        </AccordionSummary>
  	        <AccordionDetails>
  	          <Typography>
  	        <LabelIcon/>Select first the game you want to add statistics for; once you reach the dashboard, you can drag and drop players to make it
	  	      more convenient and focus on players that are on the field now.<br/>
	        <LabelIcon/>You can use the button on top to store the data in the cloud at any time or rely on regular/timely storage (every 10 minutes).
	  	      This function also works offline; however, before going to another screen, you need to gain connectivity and store the data in the cloud or 
	  	      it will be lost.<br/>
	      <LabelIcon/>Collecting data is vital for analysis and improvement.<br/>
	 	      
	      	<LabelIcon/>Track stats per game for every team member - <b>serving, digging, hitting, setting, blocking</b>.<br/>
	    	<LabelIcon/>Select tournament, team, and game and start tracking.
  	          </Typography>
  	        </AccordionDetails>
  	      </Accordion>
  	      
  	    <Accordion>
	        <AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel4a-content"
	          id="panel4a-header"
	        >
	          <Typography className={useStyles.heading}><BarChartTwoToneIcon/>View Reports</Typography>
	        </AccordionSummary>
	        <AccordionDetails>          
	          <h2> The most important functionality:</h2>
	          <Typography>
	          <LabelIcon/>Select games and visual representation of how the team is doing; this is the best coaching tool! <br/>
	          <LabelIcon/> Various reports where you can view analysis on the team level or player-vs-player.<br/>
	          </Typography>
	        </AccordionDetails>
	      </Accordion>
    	    </div>
    );
  }
}