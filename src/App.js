import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Lead from "./pages/leads/Lead";
import Opportunity from "./pages/opportunity/Opportunity";
import Company from "./pages/companies/Companies"
import Contacts from "./pages/contacts/Contacts"
import Bdm from "./pages/bdm/Bdm";
import ViewLead from './pages/leads/ViewLead'
import ViewBdm from './pages/bdm/ViewBdm'
import ViewOpportunity from "./pages/opportunity/ViewOpportunity";
import Contract from './pages/contracts/Contract'


export default class App extends Component {
  constructor(props) {
    super();
    
    let checker = false;
    const cookies = new Cookies();
        
    const token = cookies.get("token");
    if(token){
      checker = true
    } 

    this.state = {
      loggedIn: token
    }
    console.log(checker)
  }

  

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <Router>
            <div className="wrapper">
              <Header />
              <Menu />
              <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/companies">
                <Company/>
              </Route>
              <Route exact path="/contacts">
                <Contacts />
              </Route>
              <Route exact path="/bdm">
                <Bdm />
              </Route>
              <Route exact path="/bdm/view/:id">
                <ViewBdm />
              </Route>


              <Route exact path="/leads">
                <Lead />
              </Route>
            
              <Route exact path="/leads/view/:id">
                <ViewLead />
              </Route>
              <Route exact path="/opportunities">
                <Opportunity />
              </Route>
              <Route exact path="/opportunities/view/:id">
                <ViewOpportunity />
              </Route>
              
              <Route exact path="/contracts">
                <Contract/>
              </Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Router>
            <Route exact path="/">
              <div className="hold-transition login-page landing">
                <Login />
              </div>
            </Route>
            <Route exact path="/register">
              <div className="hold-transition register-page landing">
                <Register />
              </div>
            </Route>
          </Router>
        </div>
      );
    }
  }
}
