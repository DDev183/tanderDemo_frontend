import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Axios from 'axios';
import Comment from './Comment.js';
import View from './View.js';
import Stat from './Stat.js';


import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';






const useStyles = makeStyles((({
  root: {
    flexGrow: 1,
    backgroundColor: red,
  },
})))







class App extends Component {


  state = {
    value: 0
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };
  

 a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }





  render(){


  return (
    <Router>
      <div>
        {/* <ul>
          <li>
            <Link to="/comment">comment</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul> */}




        <hr />

        {

        }
        <Switch>
        <Route exact path="/menu">

            <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
              <Tab label="Форма отправки" {...this.a11yProps(0)} />
              <Tab label="Просмотр" {...this.a11yProps(1)} />
              <Tab label="Статистика" {...this.a11yProps(2)} />
            </Tabs>
          </AppBar>
          <this.TabPanel value={this.state.value} index={0}>
            <Comment />
          </this.TabPanel>
          <this.TabPanel value={this.state.value} index={1}>
            <View />
          </this.TabPanel>
          <this.TabPanel value={this.state.value} index={2}>
            <Stat />
          </this.TabPanel>

        </Route>
          <Route exact path="/comment">
            <Comment />
          </Route>
          <Route path="/view">
            <View />
          </Route>
          <Route path="/stat">
            <Stat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}





export default App;
