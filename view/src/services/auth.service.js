/**
 * http://usejsdoc.org/
 */
import axios from "axios";
import * as Constants from "../components/constants";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const { createUserWithEmailAndPassword,  getAuth, signOut, sendPasswordResetEmail, sendEmailVerification,signInWithEmailAndPassword, auth} = require('firebase/auth');

const { validateLoginData, validateSignUpData } = require('../util/validators');
var qs = require('qs');

class AuthService {

  login(email, password) {
	  event.preventDefault();
		const user = {
			email: email,
			password: password
		};
		var config = {
			    apiKey: "AIzaSyAgspjgF5XHE8lJL_lsnPczctrsriMgjRU",
			    authDomain: "todoapp-82701.firebaseapp.com",
			  };
		firebase.initializeApp(config);
		const { valid, errors } = validateLoginData(user);
		if (!valid) return response.status(400).json(errors);

		return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
	        .then((data) => {
	        	//const user = firebase.auth().currentUser;
	        	//console.log(">>>>>>>>>>>>>> " + user);
	        	//return data.user;
				if(data.user.emailVerified){
					let user = data.user;
					let token = data.user.refreshToken;
					let accessToken = data.user.multiFactor.user.accessToken;
					localStorage.setItem('AuthToken', `Bearer `+accessToken);
					localStorage.setItem('RefreshToken', token);
					localStorage.setItem('AuthTime',new Date().getTime());
					localStorage.setItem("user", JSON.stringify(user.toJSON()));
					return user;
				} else {
					return response.status(403).json(
			                { 
			                    error: 'Email not verified' 
			                }
			            );
				}
	        })
	        .catch((error) => {
	            console.error(error);
	          
	        })
		return 'OK';
  }

logoutUser = (request, response) => {
	signOut(auth).then(() => {
	  // Sign-out successful.
	}).catch((error) => {
	  // An error happened.
	});
}	

passwordReset = (request, response) => {
	const auth = getAuth();
    console.log(">>>>>>> " + request.body.email);
	sendPasswordResetEmail(auth, request.body.email)
		  .then(function() {
			  console.log(">>>>>>>>>>> Reset Email Sent");
		    })
		    .catch(function(error) {
		    	console.log(">>>>>>>>>>> " + error);
		    });
	
}	
	
passwordForgot = (request, response) => {
	let email =  request.body.email;
	const actionCodeSettings = {
			  // URL you want to redirect back to. The domain (www.example.com) for
			  // this URL must be whitelisted in the Firebase Console.
			  url: 'https://todoapp-82701.firebaseapp.com',
			  handleCodeInApp: true
	};
    console.log(">>>>>>> " + email);
    sendPasswordResetEmail(auth,email,actionCodeSettings)
    .then(() => {
    	console.log(">>>>>>>>>>>>> Mail sent!");
      })
      .catch(error => {
    	  console.log(error);
       
      });
}


  register(username, email, password, confirmPassword) {
	  const newUserData = {
				username: username,
				email: email,
				password: password,
				confirmPassword: confirmPassword
			};
	  var config = {
			    apiKey: "AIzaSyAgspjgF5XHE8lJL_lsnPczctrsriMgjRU",
			    authDomain: "todoapp-82701.firebaseapp.com",
			  };
		firebase.initializeApp(config);
		const { valid, errors } = validateSignUpData(newUserData);
	    const auth = getAuth();
		if (!valid) return response.status(400).json(errors);
	
	    let token, userId;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		    .then((userCredential) => {
		      // Signed in 
		      var user = userCredential.user;
		       sendEmailVerification(auth.currentUser).then(function() {
           			 // Verification email sent.
		            })
		            .catch(function(error) {
		              // Error occurred. Inspect error.code.
		            });
        			return data.user.getIdToken();
		    }).then((idtoken) => {
	            token = idtoken;
	       		return response.status(201).json({ token });
	        })
		    .catch((error) => {
		      var errorCode = error.code;
		      var errorMessage = error.message;
		      if (error.code === 'auth/email-already-in-use') {
					return response.status(400).json({ email: 'Email already in use' });
				} else {
					return response.status(500).json({ general: 'Something went wrong, please try again' });
				}
		    });
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAuthorizedAxios(){
	  let dd = localStorage.getItem('AuthTime');
	  let authDate = new Date(+dd);
	  let nowDate = new Date();
	  var diff =(nowDate.getTime() - authDate.getTime()) / 1000;
 	  diff /= 60;
 	  console.log("Time DIFF: " + Math.abs(Math.round(diff)));
 	  if(Math.abs(Math.round(diff)) > 40) {
		   this.refreshToken();
	   }
	  const authToken = localStorage.getItem('AuthToken');
	  axios.defaults.headers.common = { Authorization: `${authToken}` };
	  return axios;
	  
  }
  
  refreshToken(){
	 var config = {
			    apiKey: "AIzaSyAgspjgF5XHE8lJL_lsnPczctrsriMgjRU",
			    authDomain: "todoapp-82701.firebaseapp.com",
			  };
     firebase.initializeApp(config);
     const refreshToken = localStorage.getItem('RefreshToken'); 
	 const fullToken = localStorage.getItem('AuthToken'); 
	 const authToken = fullToken.split('Bearer ')[1]
	 const userData = {
		 grant_type: "refresh_token",
		 refresh_token: refreshToken
	 };
	 axios.defaults.headers.common = { Authorization: `${authToken}` };
	 return axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyAgspjgF5XHE8lJL_lsnPczctrsriMgjRU", qs.stringify(userData),
	   {
		 headers: {
		    "Content-type": "application/x-www-form-urlencoded"
		  }
	 })
			.then(response => {
				let accessToken = response.data.id_token;
				//console.log(">>>>> REFRESH TOKEN:" + accessToken + " : Old token:" + authToken);
				localStorage.setItem('AuthToken', `Bearer `+accessToken);
				
			},
			error => {			
				console.log("ERROR:" + error);
				console.log("ERROR:" + error.code);
            });
	}
}
export default new AuthService();