import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
      };
      await axios.get('sanctum/csrf-cookie').then(
        res=>{
            console.log(res.data);
            axios.post('api/register', data ).then( res =>{
            }).catch(err => {

            })
        }
      ).catch(err =>{
          console.log(err)
      });
      
    }

  render(){
    return (
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <div class="login-logo">
              <img src="247logo.png" alt="" className="brand-image img-circle" />
              iCRM
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  onChange={e=>this.name = e.target.value}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={e=>this.email = e.target.value}
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
                  onChange={e=>this.password = e.target.value}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  onChange={e=>this.password_confirmation = e.target.value}
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
                    Register
                  </button>
                </div>
              </div>
            </form>
            <p></p>
            <Link to="/" className="text-center">
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
