/**
 * http://usejsdoc.org/
 */
import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import GameDataService from "../../services/game.service";
import StatsDataService from "../../services/stats.service";

	import {
		  Chart as ChartJS,
		  CategoryScale,
		  LinearScale,
		  BarElement,
		  RadialLinearScale,
		  PointElement,
		  LineElement,
		  Filler,
		  Title,
		  Tooltip,
		  Legend,
		} from 'chart.js';
import { Bar , Radar} from 'react-chartjs-2';

ChartJS.register(
		  CategoryScale,
		  LinearScale,
		  BarElement,
		  Title,
		  RadialLinearScale,
		  PointElement,
		  LineElement,
		  Filler,
		  Tooltip,
		  Legend
		);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Service statistics - Stacked Bar',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

  const useStyles = makeStyles(theme => ({
	  root: {
	    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 750
  },
  selectTableCell: {
    width: 300
  },
  tableCell: {
    width: 300,
    height: 40
  },
  input: {
    width: 150,
    height: 40
  },

  visuallyHidden: {
	    border: 0,
	    clip: 'rect(0 0 0 0)',
	    height: 1,
	    margin: -1,
	    overflow: 'hidden',
	    padding: 0,
	    position: 'absolute',
	    top: 20,
	    width: 1,
	  },
}));


export default class Dashboard extends Component {
  constructor(props) {
   super(props);
   
   //this.handleClick = this.handleClick.bind(this);

   //console.log("=======> teamId : " +teamId);
   this.state = {
      content: "",
      service: [],
      serviceT: [],
      serviceA: [],
      serviceE: [],
      passing: [],
      blocking: [],
      hitting: [],
      digging: [],
      
      nservice: [],
      npassing: [],
      nblocking: [],
      nhitting: [],
      ndigging: [],
      names: [],
      columns: [],
      
      serviceAvg: 0,
      passingAvg: 0,
      hittingAvg: 0,
      diggingAvg: 0,
      blockingAvg: 0
   };
		   
   var data = GameDataService.getAllPerUser(1);
   if(data){
	let rowz = new Array();
	data = JSON.parse(data);
	for (let i = 0; i < Object.keys(data.games).length; i++) {
            let gameId = data.games[i].id;
			let stats = StatsDataService.get(gameId);
			let individualStats = JSON.parse(stats).stats;
		    let keysSize = JSON.parse(stats).stats.length;

				let serviceZTotal = new Array();
				let serviceZError = new Array();
				let serviceZAce = new Array();
				let serviceZ = new Array();
				let serviceAvg = 0;
				
				let passingZ = new Array();
				let passingZError = new Array();
				let passingZPerfect = new Array();
				let passingZKeep = new Array();
				let passingZPoor = new Array();
				let passingAvg = 0;
				
				let hittingZ = new Array();
				let hittingZTotal = new Array();
				let hittingZError = new Array();
				let hittingZKill = new Array();
				let hittingAvg = 0;
				
				let blockingZ = new Array();
				let blockingZTouch = new Array();
				let blockingZError = new Array();
				let blockingZSuccess = new Array();
				let blockingZBlock = new Array();
				let blockingAvg = 0;
				
				let diggingZ = new Array();
				let diggingZTouch = new Array();
				let diggingZMissed = new Array();
				let diggingZSuccess = new Array();
				let diggingAvg = 0;
	
				let namePassing = new Map();
				let nameBlocking = new Map();
				let nameHitting = new Map();
				let nameDigging = new Map();
				let labels = new Map();
				          
				for(let ii = 0; ii < keysSize; ii++){
					let playerId = individualStats[ii].id;
					let name = individualStats[ii].name;
					let number = individualStats[ii].number;
					let position = individualStats[ii].position;
					
					let s_total = individualStats[ii].s_total;
					let s_error = individualStats[ii].s_error;
					let s_ace = individualStats[ii].s_ace;
					
	
					let real_total = s_total - s_error - s_ace;
					serviceZ.push(name);
					serviceZTotal.push(real_total);
					serviceZError.push(s_error);
					serviceZAce.push(s_ace);
					serviceAvg = serviceAvg + 0.2*s_total + s_ace - 0.5*s_error;
					
					let p_poor = individualStats[ii].p_poor;
					let p_error = individualStats[ii].p_error;
					let p_perfect = individualStats[ii].p_perfect;
					let p_keep = individualStats[ii].p_keep;
					passingZ.push(name);
					passingZError.push(p_error);
					passingZPerfect.push(p_perfect);
					passingZKeep.push(p_keep);
					passingZPoor.push(p_poor);
					passingAvg = passingAvg + p_perfect - p_error - 0.25*p_poor;
					
					let h_total = individualStats[ii].h_total;
					let h_error = individualStats[ii].h_error;
					let h_kill = individualStats[ii].h_kill;
					let hitting_total = h_total - h_error - h_kill;
					hittingZ.push(name);
					hittingZTotal.push(hitting_total);
					hittingZError.push(h_error);
					hittingZKill.push(h_kill);
					hittingAvg = hittingAvg + h_kill - h_error;
					
					let d_touch = individualStats[ii].d_touch;
					let d_missed = individualStats[ii].d_missed;
					let d_success = individualStats[ii].d_success;
					diggingZ.push(name);
					diggingZTouch.push(d_touch);
					diggingZMissed.push(d_missed);
					diggingZSuccess.push(d_success);
					diggingAvg = diggingAvg + d_success + 0.25*d_touch - d_missed;
					
					let b_touch = individualStats[ii].b_touch;
					let b_error = individualStats[ii].b_error;
					let b_block = individualStats[ii].b_block;
					let b_success = individualStats[ii].b_success;
					blockingZ.push(name);
					blockingZTouch.push(b_touch);
					blockingZError.push(b_error);
					blockingZSuccess.push(b_success);
					blockingZBlock.push(b_block);
					blockingAvg = blockingAvg + b_success + b_block + 0.25*b_touch - b_error;
					
					labels.set(name);
				}
				setTimeout(() => {
				   	this.setState({
		        	  service: serviceZ,
		        	  serviceT: serviceZTotal,
		        	  serviceA: serviceZAce,
		        	  serviceE: serviceZError,
		        	  serviceAvg: serviceAvg,
		        	  
		              passing: passingZ,
		              passingPerfect: passingZPerfect,
		              passingPoor: passingZPoor,
		              passingError: passingZError,
		              passingKeep: passingZKeep,
		              passingAvg: passingAvg,
		              
		              hitting: hittingZ,
		              hittingT: hittingZTotal,
		              hittingE: hittingZError,
		              hittingK: hittingZKill,
		              hittingAvg: hittingAvg,
		              
		              blocking: blockingZ,
		              blockingT: blockingZTouch,
		              blockingE: blockingZError,
		              blockingS: blockingZSuccess,
		              blockingB: blockingZBlock,
		              blockingAvg: blockingAvg,
		              
		              digging: diggingZ,
		              diggingT: diggingZTouch,
		              diggingM: diggingZMissed,
		              diggingS: diggingZSuccess,
		              diggingAvg: diggingAvg,
		              
		
		              npassing: namePassing,
		              nblocking: nameBlocking,
		              nhitting: nameHitting,
		              ndigging: nameDigging,
		              names: labels
		          });
		        },1000);
			}
		}
  }

  shouldComponentUpdate() {
	    return true;
  }
  
  generateRadio = () => {
	  const serviceAvg = this.state.serviceAvg;
	  const passingAvg = this.state.passingAvg;
	  const hittingAvg = this.state.hittingAvg;
	  const diggingAvg = this.state.diggingAvg;
	  const blockingAvg = this.state.blockingAvg;
	  let radioData = new Array();
	  radioData.push(serviceAvg);
	  radioData.push(passingAvg);
	  radioData.push(hittingAvg);
	  radioData.push(diggingAvg);
	  radioData.push(blockingAvg);
	  const data2 = {
			  labels: ['Service ', 'Passing ', 'Hitting ', 'Digging ', 'Blocking '],
			  datasets:  [
				    {
				        label: 'Team Radio',
				        data: radioData,
				        backgroundColor: 'rgba(255, 99, 132, 0.2)',
				        borderColor: 'rgba(255, 99, 132, 1)',
				        borderWidth: 1,
				      }
				      ]
					    
		  };
		  return <Radar data={data2} />;
	  
  }
  
  generateServiceRows2 = () => {
	  let data1 = this.state.service;
	  const serviceT = this.state.serviceT;
	  const serviceA = this.state.serviceA;
	  const serviceE = this.state.serviceE;
	  const labels = Array.from(data1); 
	  const data2 = {
				  labels,
				  datasets:  [
					    {
					        label: 'Services',
					        data: serviceT,
					        backgroundColor: 'rgb(255, 99, 132)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Error',
					        data: serviceE,
					        backgroundColor: 'rgb(75, 192, 192)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Ace',
					        data: serviceA,
					        backgroundColor: 'rgb(53, 162, 235)',
					        stack: 'Stack 0',
					      }
					      ]
					    
		  };
		  return <Bar options={options} data={data2} />;
	  
  }
  
  generatePassingRows2 = () => {
	  let data1 = this.state.passing;
	  const passingPerfect = this.state.passingPerfect;
	  const passingPoor = this.state.passingPoor;
	  const passingKeep = this.state.passingKeep;
	  const passingE = this.state.passingError;
	  const labels = Array.from(data1); 
	  const data2 = {
				  labels,
				  datasets:  [
					      {
					        label: 'Error',
					        data: passingE,
					        backgroundColor: 'rgb(75, 192, 192)',
					        stack: 'Stack 0',
					      },
					      {
						        label: 'Keep',
						        data: passingKeep,
						        backgroundColor: 'rgb(255,250,205)',
						        stack: 'Stack 0',
						  },
					      {
					        label: 'Perfect',
					        data: passingPerfect,
					        backgroundColor: 'rgb(255, 99, 132)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Poor',
					        data: passingPoor,
					        backgroundColor: 'rgb(53, 162, 235)',
					        stack: 'Stack 0',
						   }
					      ]
					    
		  };
		  return <Bar options={options} data={data2} />;
	  
  }
  
  generateHittingRows2 = () => {
	  let data1 = this.state.hitting;
	  const hittingT = this.state.hittingT;
	  const hittingK = this.state.hittingK;
	  const hittingE = this.state.hittingE;
	  const labels = Array.from(data1); 
	  const data2 = {
				  labels,
				  datasets:  [
					      {
					        label: 'Error',
					        data: hittingE,
					        backgroundColor: 'rgb(75, 192, 192)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Kill',
					        data: hittingK,
					        backgroundColor: 'rgb(255, 99, 132)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Total',
					        data: hittingT,
					        backgroundColor: 'rgb(53, 162, 235)',
					        stack: 'Stack 0',
						   }
					      ]
					    
		  };
		  return <Bar options={options} data={data2} />;
	  
  }
  
  generateDiggingRows2 = () => {
	  let data1 = this.state.hitting;
	  const diggingT = this.state.diggingT;
	  const diggingS = this.state.diggingS;
	  const diggingM = this.state.diggingM;
	  const labels = Array.from(data1); 
	  const data2 = {
				  labels,
				  datasets:  [
					      {
					        label: 'Missed',
					        data: diggingM,
					        backgroundColor: 'rgb(75, 192, 192)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Success',
					        data: diggingS,
					        backgroundColor: 'rgb(255, 99, 132)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Touch',
					        data: diggingT,
					        backgroundColor: 'rgb(53, 162, 235)',
					        stack: 'Stack 0',
						   }
					      ]
					    
		  };
		  return <Bar options={options} data={data2} />;
	  
  }
  
  generateBlockingRows2 = () => {
	  let data1 = this.state.hitting;
	  const blockingT = this.state.blockingT;
	  const blockingE = this.state.blockingE;
	  const blockingS = this.state.blockingS;
	  const blockingB = this.state.blockingB;
	  const labels = Array.from(data1); 
	  const data2 = {
				  labels,
				  datasets:  [
					      {
					        label: 'Error',
					        data: blockingE,
					        backgroundColor: 'rgb(75, 192, 192)',
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Success',
					        data: blockingS,
					        backgroundColor: 'rgb(255, 99, 132)', //red
					        stack: 'Stack 0',
					      },
					      {
					        label: 'Touch',
					        data: blockingT,
					        backgroundColor: 'rgb(53, 162, 235)',
					        stack: 'Stack 0',
						   },
						   {
					        label: 'Block',
					        data: blockingB,
					        backgroundColor: 'rgb(211,211,211))',
					        stack: 'Stack 0',
						   }
					      ]
					    
		  };
		  return <Bar options={options} data={data2} />;
	  
  }
  
render() {
	if(this.state.hitting){
		return (
			<Paper className={useStyles.root}>
				Team Radio Chart
				<hr/>
				<div style={{ height: 1200 }}>
				{this.generateRadio()}
				</div>
				<br/>	
				Serv Statistics
				<hr/>
				<div style={{ height: 600 }}>
				{this.generateServiceRows2()}
				</div>
				
				Passing Statistics
				<hr/>
				<div style={{ height: 600 }}>
				{this.generatePassingRows2()}
				</div>
				
				Hitting Statistics
				<hr/>
				<div style={{ height: 600 }}>
				{this.generateHittingRows2()}
				</div>
				
				Digging Statistics
				<hr/>
				<div style={{ height: 600 }}>
				{this.generateDiggingRows2()}
				</div>
				
				Blocking Statistics
				<hr/>
				<div style={{ height: 600 }}>
				{this.generateBlockingRows2()}
				</div>
				</Paper>
			);
		} else {
			return (
				<Paper className={useStyles.root}>
					<hr/>
					<div style={{ height: 1200 }}>
						Please make sure you have team, games and statistics before checking the reports !
					</div>
					</Paper>
			);
		}
	}
}