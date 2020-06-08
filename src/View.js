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









class View extends Component {


  useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(5),
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
    }

    componentDidMount() {
      const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors'
    
        }
    
    }
    
    
    
        Axios.get('http://localhost:8080/all?id=null', axiosConfig)
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


    update(){
      
    }


    removeItem = (index, comment) => {
      console.log("keks")
      console.log(index);
      console.log(comment.id);

      const axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors'
    
        }
    
    }
    
    
    
        Axios.get('http://localhost:8080/all?id=' + comment.id, axiosConfig)
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



    render(){
    
      return(
        <div>
          <TableContainer component={Paper}>
                        <Table className={this.useStyles.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Фамилия</TableCell>
                                <TableCell align="left">Имя</TableCell>
                                <TableCell align="left">Отчество</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Телефон</TableCell>
                                <TableCell align="left">Регион</TableCell>
                                <TableCell align="left">Город</TableCell>
                                <TableCell align="left">Комментарий</TableCell>
                                <TableCell align="center">X</TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.comments.map((comment, index) => (


                                <TableRow key={index}>
                                <TableCell component="th" scope="row">{comment.lastname}</TableCell>
                                <TableCell component="th" scope="row">{comment.firstname}</TableCell>
                                <TableCell component="th" scope="row">{comment.middlename}</TableCell>
                                <TableCell component="th" scope="row">{comment.email}</TableCell>
                                <TableCell component="th" scope="row">{comment.telnumber}</TableCell>
                                <TableCell component="th" scope="row">{comment.region}</TableCell>
                                <TableCell component="th" scope="row">{comment.city}</TableCell>
                                <TableCell component="th" scope="row">{comment.commentText}</TableCell>
                                <TableCell component="th" scope="row"> <Button onClick={() => this.removeItem(index, comment)} color="primary">X</Button> </TableCell>
                              
                                
                                    



                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
        </div>
      )
    }

}

export default View;
