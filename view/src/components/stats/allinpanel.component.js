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
		//localStorage.removeItem("gameId");
	    this.handlePassingClick = this.handlePassingClick.bind(this);
	    this.handleServingClick = this.handleServingClick.bind(this);
	    this.handleHittingClick = this.handleHittingClick.bind(this);
	    this.handleBlockingClick = this.handleBlockingClick.bind(this);
	    this.handleDiggingClick = this.handleDiggingClick.bind(this);
	    
	    this.handleStoreClick = this.handleStoreClick.bind(this);
	    this.onDragEnd = this.onDragEnd.bind(this);
		this.reloadData();
		//localStorage.removeItem("1_stats");
	}

	reloadData(){
		setTimeout(() => {
			this.setState({
				data: null
			});
		  },1000);
		  let gameId = localStorage.getItem("gameId");
		let stats = StatsDataService.get(gameId);
		let rowz = new Array();
		//stats = JSON.parse(stats);
		for (let i = 0; i < Object.keys(stats).length; i++) {
			let playerId = stats[i].id;
			let name = stats[i].name;
			let number = stats[i].number;
			let position = stats[i].position;

			let b_error = stats[i].b_error;
            let b_touch = stats[i].b_touch;
            let b_block = stats[i].b_block;
            let b_success = stats[i].b_success;

            let d_missed = stats[i].d_missed;
            let d_touch = stats[i].d_touch;
            let d_success = stats[i].d_success;

            let h_error = stats[i].h_error;
            let h_kill = stats[i].h_kill;
            let h_total = stats[i].h_total;

            let p_error = stats[i].p_error;
            let p_poor = stats[i].p_poor;
            let p_keep = stats[i].p_keep;
            let p_perfect =stats[i].p_perfect;

            let s_total = stats[i].s_total;
            let s_ace = stats[i].s_ace;
            let s_error =stats[i].s_error;
			rowz[i] = {'id' : playerId, 'name' : name, 'position' : position, 'number' : number,
				"b_error": b_error,
				"b_touch": b_touch,
				"b_block": b_block,
				"b_success": b_success,
				"d_missed": d_missed,
				"d_touch": d_touch,
				"d_success": d_success,
				
				"h_error": h_error,
				"h_kill": h_kill,
				"h_total": h_total,
				
				"p_error": p_error,
				"p_poor": p_poor,
				"p_keep": p_keep,
				"p_perfect": p_perfect,
				
				"s_total": s_total,
				"s_ace": s_ace,
				"s_error": s_error
			};
		}
	    setTimeout(() => {
			const jsdata = rowz;
			this.setState({
			  data: jsdata
			});
		  },1000);
	}
		  

	componentDidMount() {
		this.reloadData();
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
		if(jsondata){ 		
			return (		
				<DragDropContext onDragEnd={this.onDragEnd}>
				<div className="app">
				<Droppable droppableId="droppable-list" key="{i}">
					
						{provided => (
									
						//<RootRef rootRef={provided.innerRef}>
						<div ref={provided.innerRef} key="{provided.id}">
						<List>
								
							{jsondata.map((group, index) => {
								return(
								<Draggable draggableId={group.id} key={group.id} index={index}>	
								{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											key={group.id}>
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
			    </TableContainer>);
	}
	
  item2({ provided, item, style, isDragging }, group){
		return (
				
				 <TableBody key={group.id}>	
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