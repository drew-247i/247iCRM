import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";

export default class Login extends Component {
  
  state = {};
  handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      email: this.email,
      password: this.password,
    };

    axios.get("sanctum/csrf-cookie").then((res) => {
      axios
        .post("api/login", data)
        .then((res) => {
          console.log(res.data);
          // localStorage.setItem("token", res.data.token);
          // localStorage.setItem("username", res.data.user.name);
          const cookies = new Cookies();
          cookies.set('token', res.data.token,{Expires: 7200});
          cookies.set('username', res.data.user.name);
          this.setState({ loggedIn: true });
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };


  render() {
    if(this.state.loggedIn){
      <Redirect exact to="/"/>
    }

    return (
      <div className="login-box">
        <div className="card">
          <div className="card-body login-card-body">
            <div class="login-logo">
              <img src="247logo.png" alt ="" className="brand-image img-circle" />
              iCRM
            </div>
            <form onSubmit={this.handleSubmit}>
            
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => (this.email = e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => (this.password = e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mb-3">
              <Link to="#" className="btn btn-block btn-danger">
                <i className="fab fa-google mr-2" /> Sign in using Google
              </Link>
            </div>
            <p className="mb-1">
              <Link to="#">Forgot password</Link>
            </p>
            <p className="mb-1">
              <Link to="register">Register Account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
