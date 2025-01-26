import React, { Component } from "react";
import { TableCell,TableBody,Table, TableRow, Button  } from '@mui/material';
import {  List} from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import Badge from '@mui/material/Badge';
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';

import StatsDataService from "../../services/stats.service";
		
export default class AllinBoard extends Component {
	
	constructor(props) {
	    super(props);
 
	    this.state = {
	            data: null
	        } 
	    let gameId = localStorage.getItem("gameId");
		localStorage.removeItem("gameId");
	    this.handlePassingClick = this.handlePassingClick.bind(this);
	    this.handleServingClick = this.handleServingClick.bind(this);
	    this.handleHittingClick = this.handleHittingClick.bind(this);
	    this.handleBlockingClick = this.handleBlockingClick.bind(this);
	    this.handleDiggingClick = this.handleDiggingClick.bind(this);
	    
	    this.handleStoreClick = this.handleStoreClick.bind(this);
	    this.onDragEnd = this.onDragEnd.bind(this)
	    
	    StatsDataService.get(gameId)
	      .then(response => {
	          setTimeout(() => {
	        	  const jsdata = response.data;
	              this.setState({
	                data: jsdata
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
	
 getStyle({ provided, style, isDragging }) {
		  // If you don't want any spacing between your items
		  // then you could just return this.
		  // I do a little bit of magic to have some nice visual space
		  // between the row items
		  const combined = {
		    ...style,
		    ...provided.draggableProps.style
		  };

		  const marginBottom = 8;
		  const withSpacing = {
		    ...combined,
		    height: isDragging ? combined.height : combined.height - marginBottom,
		    marginBottom
		  };
		  return withSpacing;
		}
	      
	handleStoreClick(e) {
		this.updateDBWithState();
    }      

	handlePassingClick(e,playerId,type, field) {
		let playersData = this.state.data;
		let player = playersData.find(playerD => playerD.id === playerId);
		if (field == 'perfect'){
			if(type == 1) {
				player.p_perfect = player.p_perfect + 1;
			} else {
				player.p_perfect = player.p_perfect - 1;
				if(player.p_perfect < 0) player.p_perfect = 0;
			}
		}
		if (field == 'error'){
			if(type == 1) {
				player.p_error = player.p_error + 1;
			} else {
				player.p_error = player.p_error - 1;
				if(player.p_error < 0) player.p_error = 0;
			}
		}
		if (field == 'keep'){
			if(type == 1) {
				player.p_keep = player.p_keep + 1;
			} else {
				player.p_keep = player.p_keep - 1;
				if(player.p_keep < 0) player.p_keep = 0;
			}
		}
		if (field == 'poor'){
			if(type == 1) {
				player.p_poor = player.p_poor + 1;
			} else {
				player.p_poor = player.p_poor - 1;
				if(player.p_poor < 0) player.p_poor = 0;
			}
		}
		setTimeout(() => {
            this.setState({
              data: playersData
            });
          },500);
    }
	
	handleServingClick(e,playerId,type, field) {
		let playersData = this.state.data;
		let player = playersData.find(playerD => playerD.id === playerId);
		if (field == 'ace'){
			if(type == 1) {
				player.s_ace = player.s_ace + 1;
			} else {
				player.s_ace = player.s_ace - 1;
				if(player.s_ace < 0) player.s_ace = 0;
			}
		}
		if (field == 'error'){
			if(type == 1) {
				player.s_error = player.s_error + 1;
			} else {
				player.s_error = player.s_error - 1;
				if(player.s_error < 0) player.s_error = 0;
			}
		}
		if (field == 'total'){
			if(type == 1) {
				player.s_total = player.s_total + 1;
			} else {
				player.s_total = player.s_total - 1;
				if(player.s_total < 0) player.s_total = 0;
			}
		}
		setTimeout(() => {
            this.setState({
              data: playersData
            });
          },500);
    }
	
	handleHittingClick(e,playerId,type, field) {
		let playersData = this.state.data;
		let player = playersData.find(playerD => playerD.id === playerId);
		if (field == 'kill'){
			if(type == 1) {
				player.h_kill = player.h_kill + 1;
			} else {
				player.h_kill = player.h_kill - 1;
				if(player.h_kill < 0) player.h_kill = 0;
			}
		}
		if (field == 'error'){
			if(type == 1) {
				player.h_error = player.h_error + 1;
			} else {
				player.h_error = player.h_error - 1;
				if(player.h_error < 0) player.h_error = 0;
			}
		}
		if (field == 'total'){
			if(type == 1) {
				player.h_total = player.h_total + 1;
			} else {
				player.h_total = player.h_total - 1;
				if(player.h_total < 0) player.h_total = 0;
			}
		}
		//console.log("===" + JSON.stringify(playersData));
		setTimeout(() => {
            this.setState({
              data: playersData
            });
          },500);
    }

	handleBlockingClick(e,playerId,type, field) {
		let playersData = this.state.data;
		let player = playersData.find(playerD => playerD.id === playerId);
		if (field == 'block'){
			if(type == 1) {
				player.b_block = player.b_block + 1;
			} else {
				player.b_block = player.b_block - 1;
				if(player.b_block < 0) player.b_block = 0;
			}
		}
		if (field == 'error'){
			if(type == 1) {
				player.b_error = player.b_error + 1;
			} else {
				player.b_error = player.b_error - 1;
				if(player.b_error < 0) player.b_error = 0;
			}
		}
		if (field == 'touch'){
			if(type == 1) {
				player.b_touch = player.b_touch + 1;
			} else {
				player.b_touch = player.b_touch - 1;
				if(player.b_touch < 0) player.b_touch = 0;
			}
		}
		if (field == 'success'){
			if(type == 1) {
				player.b_success = player.b_success + 1;
			} else {
				player.b_success = player.b_success - 1;
				if(player.b_success < 0) player.b_success = 0;
			}
		}
		setTimeout(() => {
            this.setState({
              data: playersData
            });
          },500);
    }
	
	handleDiggingClick(e,playerId,type, field) {
		let playersData = this.state.data;
		let player = playersData.find(playerD => playerD.id === playerId);
		if (field == 'success'){
			if(type == 1) {
				player.d_success = player.d_success + 1;
			} else {
				player.d_success = player.d_success - 1;
				if(player.d_success < 0) player.d_success = 0;
			}
		}
		if (field == 'missed'){
			if(type == 1) {
				player.d_missed = player.d_missed + 1;
			} else {
				player.d_missed = player.d_missed - 1;
				if(player.d_missed < 0) player.d_missed = 0;
			}
		}
		if (field == 'touched'){
			if(type == 1) {
				player.d_touch = player.d_touch + 1;
			} else {
				player.d_touch = player.d_touch - 1;
				if(player.d_touch < 0) player.d_touch = 0;
			}
		}
		setTimeout(() => {
            this.setState({
              data: playersData
            });
          },500);
    }
	
	generatePassingCard(poor, error, keep,perfect, playerId){
		return (
				<Card>
			     
			        
			        	<strong>
			            Passing / Setting (for Setters)
			            </strong>
			        
			        
		            <Table style={{ width: "100%" }} aria-label="spanning table">
			        <TableBody>
			          <TableRow>
			          
			          
			          <TableCell>
			          Error (0)
			          </TableCell>
			          
			          <TableCell>
			          Keep (1)
			          </TableCell>
			          
			          <TableCell>
			          Poor (2)
			          </TableCell>
			          
			          <TableCell>
			          Perfect(3)
			          </TableCell>	
			          
			          </TableRow>
			          <TableRow>
			          
	        		
			        <TableCell>
				        <Badge overlap="rectangular" badgeContent={error} color="primary">
			        	<Chip size="medium" variant="outlined" style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handlePassingClick(e,playerId,1,'error')}/>
			        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handlePassingClick(e,playerId,2,'error')}/>
				        </Badge>
			        </TableCell>	
	        		
			      <TableCell>
			          <Badge overlap="rectangular" badgeContent={keep} color="primary">
			        	<Chip size="medium" variant="outlined" style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handlePassingClick(e,playerId,1,'keep')}/>
			        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handlePassingClick(e,playerId,2,'keep')}/>
				      </Badge>  		
			      </TableCell>  
			        
		          <TableCell>
			          <Badge overlap="rectangular" badgeContent={poor} color="primary">
			        	<Chip size="medium" variant="outlined" style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handlePassingClick(e,playerId,1,'poor')}/>
			        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handlePassingClick(e,playerId,2,'poor')}/>
				      </Badge>  		
			      </TableCell>
			      
			      <TableCell>
		          <Badge overlap="rectangular" badgeContent={perfect} color="primary">
		        	<Chip size="medium" variant="outlined" style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handlePassingClick(e,playerId,1,'perfect')}/>
		        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handlePassingClick(e,playerId,2,'perfect')}/>
		          </Badge>		
		        </TableCell>
			        </TableRow>		
			        </TableBody>
			        </Table>

			    </Card>	
				);
	}
	
	generateServingCard(total, error, ace, playerId){
		return (
				<Card>
			     
		        
		        	<strong>    
		        	Serving
		        	</strong>
		        
		        
	            <Table style={{ width: "100%" }} aria-label="spanning table">
		        <TableBody>
		          <TableRow>
		          <TableCell>
		        	Ace
		          </TableCell>	
		          <TableCell>
		          Error
		          </TableCell>
		         
		          <TableCell>
		          Total
		          </TableCell>
		          </TableRow>
		          
		          <TableRow>
		          <TableCell>
		          <Badge badgeContent={ace} overlap="rectangular" color="primary">
		        	<Chip size="medium" variant="outlined" style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleServingClick(e,playerId,1,'ace')}/>
		        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleServingClick(e,playerId,2,'ace')}/>
		          </Badge>		
		        		</TableCell>
        		
		        <TableCell>
		        <Badge badgeContent={error} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleServingClick(e,playerId,1,'error')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleServingClick(e,playerId,2,'error')}/>
		        </Badge>		
		        	</TableCell>	
        		
	          <TableCell>	
	          <Badge badgeContent={total} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleServingClick(e,playerId,1,'total')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleServingClick(e,playerId,2,'total')}/>
		      </Badge>  		
		        	</TableCell>
		        		 </TableRow>		
		        </TableBody>
		        </Table>
		      
		      
		      
		    </Card>
				);
	}
	
	generateHittingCard(total, error, kill, playerId){
		return (
				<Card>
			     
		        
		        	<strong>
		        	Hitting
		        	</strong>
		        
		        
	            <Table style={{ width: "100%" }} aria-label="spanning table">
		        <TableBody>
		          <TableRow>
		          <TableCell>
		          Kill
		          </TableCell>	
		          <TableCell>
		          Error
		          </TableCell>
		         
		          <TableCell>
		          Total
		          </TableCell>
		          </TableRow>
		          
		          <TableRow>
		          <TableCell>
		          <Badge badgeContent={kill} overlap="rectangular" color="primary">
		        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleHittingClick(e,playerId,1,'kill')}/>
		        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleHittingClick(e,playerId,2,'kill')}/>
		          </Badge>		
		        	</TableCell>
        		
		        <TableCell>
		        <Badge badgeContent={error} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleHittingClick(e,playerId,1,'error')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleHittingClick(e,playerId,2,'error')}/>
		        </Badge>		
		        	</TableCell>	
        		
	          <TableCell>
	          <Badge badgeContent={total} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleHittingClick(e,playerId,1,'total')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleHittingClick(e,playerId,2,'total')}/>
		       </Badge> 		
		        	</TableCell>
		        		 </TableRow>		
		        </TableBody>
		        </Table>

		    </Card>	
				);
	}
	
	generateBlockingCard(touch,error,block,success, playerId){
		return (
				<Card>
			     
		        
		        	<strong>    
		        	Blocking
		        	</strong>
		        
		        
	            <Table style={{ width: "100%" }} aria-label="spanning table">
		        <TableBody>
		          <TableRow>
		          <TableCell>
			          <i>
			          Block
			          </i>
		          </TableCell>	
		          <TableCell>
		          	<i>
		          	Error
		          	</i>
		          </TableCell>
		         
		          <TableCell>
		          Touch
		          </TableCell>
		          <TableCell>
		          Success
		          </TableCell>
		          </TableRow>
		          
		          <TableRow>
		          <TableCell>
		          <Badge badgeContent={block} overlap="rectangular" color="primary">
		        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleBlockingClick(e,playerId,1,'block')}/>
		        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleBlockingClick(e,playerId,2,'block')}/>
		         </Badge>		
		        	</TableCell>
        		
		        <TableCell>
		        <Badge badgeContent={error} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleBlockingClick(e,playerId,1,'error')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleBlockingClick(e,playerId,2,'error')}/>
		        </Badge>		
		        	</TableCell>	
        		
	          <TableCell>
	          <Badge badgeContent={touch} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleBlockingClick(e,playerId,1,'touch')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleBlockingClick(e,playerId,2,'touch')}/>
		       </Badge>	
		        	</TableCell>
		      <TableCell>	
		      <Badge badgeContent={success} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleBlockingClick(e,playerId,1,'success')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleBlockingClick(e,playerId,2,'success')}/>
			   </Badge>		
			        	</TableCell>  		
		        		 </TableRow>		
		        </TableBody>
		        </Table>

		    </Card>
				);
	}
	
	generateDiggingCard(touch, missed, success, playerId){
		return (
				<Card>
			     
		        <strong>    
		        	Digging
		        </strong>
		        
	            <Table style={{ width: "100%" }} aria-label="spanning table">
		        <TableBody>
		          <TableRow>
		          <TableCell>
		          Success
		          </TableCell>	
		          <TableCell>
		          Missed
		          </TableCell>
		         
		          <TableCell>
		          Touch
		          </TableCell>
		          </TableRow>
		          
		          <TableRow>
		          <TableCell>
		          <Badge badgeContent={success} overlap="rectangular" color="primary">
		        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleDiggingClick(e,playerId,1,'success')}/>
		        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleDiggingClick(e,playerId,2,'success')}/>
		         </Badge>		
		        	</TableCell>
        		
		        <TableCell>
		        <Badge badgeContent={missed} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleDiggingClick(e,playerId,1,'missed')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleDiggingClick(e,playerId,2,'missed')}/>
		        </Badge>		
		        	</TableCell>	
        		
	          <TableCell>	
	          <Badge badgeContent={touch} overlap="rectangular" color="primary">
	        	<Chip size="medium" variant="outlined"  style={{backgroundColor:'lightgreen'}} label="+" onClick={(e) => this.handleDiggingClick(e,playerId,1,'touched')}/>
	        	<Chip size="medium" style={{backgroundColor:'red'}} label="-" onClick={(e) => this.handleDiggingClick(e,playerId,2,'touched')}/>
		      </Badge>  		
		        	</TableCell>
		        		 </TableRow>		
		        </TableBody>
		        </Table>

		    </Card>	
				);
	}
	
	saveOfflineState(){
		let currentUser = AuthService.getCurrentUser();
		let userId = currentUser.uid;
		let playersData = this.state.data;
		localStorage.setItem("playersData",JSON.stringify(playersData));
		let lastUpdate = new Date(localStorage.getItem("update_timestamp"));
		var present_date = new Date();
		const ten_minutes = 1 * 60 * 1000;
		const compareTo = new Date(present_date - ten_minutes);
		if(!lastUpdate || compareTo.getTime() > lastUpdate.getTime()){
			console.log("------------------ UPDATE Server Side and TimeStamp---------------");
			localStorage.setItem("update_timestamp",present_date.toString());
			//currentUser.revokeRefreshTokens(userId);
			this.updateDBWithState();
		}
		//localStorage.setItem("timestamp")
	}
	
	updateDBWithState(){
		let jdata = JSON.parse(localStorage.getItem("playersData"));
		let dataarr = Array.from(jdata); 
		for (let i = 0; i < dataarr.length; i++) {
		    StatsDataService.update(dataarr[i].id,dataarr[i]);
		}
		
	}
	
	onDragEnd(result) {
		  const { destination, source, draggableId } = result;
		  if (!destination) { return }
		 
		  //const column = this.state.column;
		  //draggableId //id of the component/index we are dragging
		  //destination.index //position TO where we are dropping in the list
		  //source.index //position FROM where we are taking it
		  
		  const list = this.state.data;
		  //const list = this.state.raws.list;
		// delete one element only, in index-from
		  const elm = list.splice(source.index, 1)[0];
		  list.splice(destination.index, 0, elm);
		  
		}
	
	generateRows(){
		let jsondata = this.state.data;
		let i = 1; 
		let dataarr = Array.from(jsondata);
		if(jsondata) {
				//return  (
				
				//{Object.values(this.state.data).map((column) => {  		
					return (		
						<DragDropContext onDragEnd={this.onDragEnd}>
						<div className="app">
						<Droppable droppableId="droppable-list">
				          
					      		{provided => (
					      				 
			      				//<RootRef rootRef={provided.innerRef}>
			      				<div ref={provided.innerRef}>
			  		            <List>
					      				
					      			{jsondata.map((group, index) => {
					      			  return(
										<Draggable draggableId={group.id} key={group.id} index={index}>	
										{(provided, snapshot) => (
											    <div
											      ref={provided.innerRef}
											      {...provided.draggableProps}
											      {...provided.dragHandleProps}
											    >
											      { this.item2(provided,group) }
											    </div>
											  )}
										</Draggable> 
										);
									   } 
					      			  )  
					      			} {provided.placeholder}
					      			 </List>
					      			 </div>
					      			 //</RootRef>
									)}
					      		</Droppable>
					      		</div>
					      </DragDropContext>
							   );			
		}
	}
	
	render() { 	
		let jsondata = this.state.data;
		
		if(jsondata) {
		  let dataarr = Array.from(jsondata);
		  this.saveOfflineState();
		  return (	  
			   <TableContainer style={{ width: "100%" }}>
						<Button style={{ width: "100%" }} variant="contained" color="primary" onClick={this.handleStoreClick}>
			                Store data to the Cloud
			              </Button>
			      <Table style={{ width: "100%" }} aria-label="spanning table">
			     
			      <tbody>
			      <tr>
			      <td>
			      	{ this.generateRows() }
			      	</td>
			      	</tr>
			      </tbody>	
			     
			      </Table>
			    </TableContainer>
			    
			  );
		}else {
			return <TableBody><TableRow style={{ width: "100%" }}><TableCell>Data is Loading ...</TableCell></TableRow></TableBody>
		}
	}
	
  item2({ provided, item, style, isDragging }, group){
		return (
				
				 <TableBody>	
				  <TableRow style={{ width: "100%" }}>
		            <TableCell><strong><i> {group.name}({group.number})-{group.position}  </i></strong></TableCell>
		            <TableCell >{this.generatePassingCard(group.p_poor, group.p_error,group.p_keep, group.p_perfect,group.id)}</TableCell>
		            <TableCell >{this.generateServingCard(group.s_total, group.s_error,group.s_ace,group.id)}</TableCell>
		          </TableRow>
		          <TableRow style={{ width: "100%" }}>
		            <TableCell>{this.generateHittingCard(group.h_total,group.h_error,group.h_kill,group.id)}</TableCell>
		            <TableCell >{this.generateBlockingCard(group.b_touch,group.b_error,group.b_block,group.b_success,group.id)}</TableCell>
		            <TableCell >{this.generateDiggingCard(group.d_touch,group.d_missed, group.d_success,group.id)}</TableCell>
		          </TableRow>
		          <TableRow style={{ width: "100%" }}>
		          	<TableCell >
		          		<hr/>
		            </TableCell>
		          </TableRow>
		          </TableBody>	  		
		);
	}
}