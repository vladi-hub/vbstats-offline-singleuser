/**
 * http://usejsdoc.org/
 */
import React, { Component } from "react";
import AuthService from "../services/auth.service";
import * as Constants from "../components/constants";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    
    this.sentResetLink = this.sentResetLink.bind(this);
    
	this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  sentResetLink(e){
	  const { currentUser } = this.state;
	  const data = {
		  email: currentUser.email
	  };
	  return AuthService. passwordReset()
				.then(response => {
					
					
					return response.status(200).json(
		                { 
		                    message: 'Password reset link sent!' 
		                }
		            );
				},
				error => {
					console.log(error);
				});
  }
  
  render() {
	const { currentUser } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.email}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Welcome to your profile!</strong>
   
        </p>
        <p>
          <strong>uId:</strong>{" "}
          {currentUser.uid}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Team members:</strong>{" "}
         
        </p>
        <p>
          <strong>Added games:</strong>{" "}
          
        </p>
        <p>
          <strong>Total Stats:</strong>{" "}
          
        </p>
        <p>
          <strong>Switch to Paid:</strong>{" "}
          
        </p>
        <strong>Reset Password</strong>
        <ul>
         <button className="btn btn-primary btn-block" onClick={this.sentResetLink}> Reset Password
              </button>
        </ul>
      </div>
    );
  }
}