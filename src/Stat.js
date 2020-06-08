import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Axios from 'axios';


import { TextField } from '@material-ui/core';
import InputMask from "react-input-mask";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SelectField from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormErrors from './layout/FormErrors.js';
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PhoneInput from 'react-phone-number-input';
import MaskedInput from 'react-text-mask';



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinkMaterial from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import { Container } from '@material-ui/core';

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';









class Stat extends Component {


  useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(3),
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));
  


    state = {
        comments: [],
        city: false,
        cities: []
    }

    componentDidMount() {
      const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors'
    
        }
    
    }
    
    
    
        Axios.get('http://localhost:8080/stat', axiosConfig)
        .then(response => {
    
            if (response.status != 200){
                console.log("ERRORRRRRR!!");
    
    
            } else {
                console.log(response.data);
                this.setState({comments: response.data});
                console.log(this.state.comments);
                // this.setState({load: true});
                // this.setState({Userlist: response.data});
                // console.log(this.state.Userlist[0].id);
                // this.state.Userlist.map((user) => console.log(user.id));
                // console.log(JSON.parse(this.state.Userlist));
                // console.log(JSON.parse(response.data))
    
            }
    
        })
    }

    back(){
        this.setState({cities: []});
        this.setState({city: false});
    }


    getCities(region) {
        console.log(region);

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode': 'no-cors'
        
            }
        
        }
        
        
        
            Axios.get('http://localhost:8080/regionStat?region=' + region, axiosConfig)
            .then(response => {
        
                if (response.status != 200){
                    console.log("ERRORRRRRR!!");
        
        
                } else {
                    console.log(response.data);
                    this.setState({cities: response.data});
                    this.setState({city: true});
                    // this.setState({load: true});
                    // this.setState({Userlist: response.data});
                    // console.log(this.state.Userlist[0].id);
                    // this.state.Userlist.map((user) => console.log(user.id));
                    // console.log(JSON.parse(this.state.Userlist));
                    // console.log(JSON.parse(response.data))
        
                }
        
            })
    }




    render(){
    if (this.state.city == false) {
        
      return(
        <div>
          <TableContainer component={Paper}>
                        <Table className={this.useStyles.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Регион</TableCell>
                                <TableCell align="left">Количество</TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.comments.map((comment, index) => (


                                <TableRow key={index}>
                                <TableCell align="left">
                                
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        console.info("I'm a button.");
                                        this.getCities(comment.region);

                                    }}
                                    >
                                    {comment.region}
                                    </Link>
                                </TableCell>
                                <TableCell component="th" scope="row">{comment.size}</TableCell>

                              
                                
                                    



                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
        </div>
      )
    }
if (this.state.city == true) {
    return(
        <div>
        <TableContainer component={Paper}>
                      <Table className={this.useStyles.table} aria-label="simple table">
                          <TableHead>
                          <TableRow>
                              <TableCell align="left">Город</TableCell>
                              <TableCell align="left">Количество</TableCell>

                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {this.state.cities.map((city, index) => (


                              <TableRow key={index}>
                              <TableCell component="th" scope="row">{city.region}</TableCell>
                              <TableCell component="th" scope="row">{city.size}</TableCell>

                            
                              
                                  



                              </TableRow>
                          ))}
                          </TableBody>
                      </Table>
                      </TableContainer>


                      <Button onClick={() => this.back()} color="primary">
                            Назад
                        </Button>
      </div>
    );
}

}
}

export default Stat;
