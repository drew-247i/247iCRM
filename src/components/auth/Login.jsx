import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import { VpnKey } from "@material-ui/icons";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {};
  login_user = async (e) => {
    const creds = { email: this.email, password: this.password };
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie");
    await axios
      .post("api/login", creds)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        this.setState({ loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if(this.state.loggedIn) {
      return <Redirect to={'/accounts'}/>;
    }

    console.log(new Cookies().get("sanctum"));
    return (
      <div id="body" className="text-center">
        <main className="form-signin">
          <form onSubmit={this.login_user}>
            <h1 className="h3 mb-3 fw-normal">
              <strong>24/7i</strong>
              <i>CRM</i>
            </h1>
            <VpnKey />
            <div className="mb-3"></div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control "
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={(e) => (this.email = e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => (this.password = e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="mb-3"></div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log in
            </button>
            <p className="mt-5 mb-3 text-muted">©2021</p>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
