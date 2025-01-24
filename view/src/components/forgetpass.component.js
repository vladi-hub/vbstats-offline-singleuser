import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import * as Constants from "../components/constants";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.sentResetLink = this.sentResetLink.bind(this);

    this.state = {
      loading: false,
      message: ""
    };
  }
  
  sentResetLink(e){
	  const data = {
		  email: e.target[0].value
	  };
	  return AuthService.passwordForgots()
				.then(response => {
					
					this.setState({
		                loading: false,
		                message: 'Password reset link sent!' 
		              });
	
				},
				error => {
					this.setState({
		                loading: false,
		                message: 'Something went wrong ! Try again later!'
		              });
				});
  }

  render() {
    return (
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recover Password
            </Typography>
            <Form
              onSubmit={this.sentResetLink}
              ref={c => {
                this.form = c;
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                validations={[required]}
                autoComplete="email"
                autoFocus
              />
              
              {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}
              <CheckButton
              style={{ display: "none" }}
              ref={c => { this.checkBtn = c; }}
            />     
              <button className="btn btn-primary btn-block"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Recover
              </button>
            </Form>
          </Box>
        </Container>

    );
  }
}