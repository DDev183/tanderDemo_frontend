
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









class Comment extends Component {



    
    state = {
        regions: [],
        cities: [],
        formErrors: {firstname: '', lastname: '', email: '', telnumber: '', commentText: ''},
        fistname: '',
        lastname: '',
        middlename: '',
        telnumber: '',
        email: '',
        commentText: '',
        region: '',
        city: '',
        firstnameValid: false,
        lastnameValid: false,
        telnumberValid: false,
        emailValid: false,
        commentTextValid: false,
        formValid: false,

      }




      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let telnumberValid = this.state.telnumberValid;
        let emailValid = this.state.emailValid;
        let commentTextValid = this.state.commentTextValid;
        
      switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' Email с ошибкой';
            break;
          case 'commentText':
            commentTextValid = value.length >= 6;
            fieldValidationErrors.commentText = commentTextValid ? '': ' Комментарий слишком короткий';
            break;
          case 'firstname':
            firstnameValid = value.length >= 3;
            fieldValidationErrors.firstname = firstnameValid ? '' : 'Ошибка в имени';
            break;
          case 'lastname':
            lastnameValid = value.length >= 3;
            fieldValidationErrors.lastname = lastnameValid ? '' : 'Ошибка в фамилии';
            break;
          case 'telnumber':
            telnumberValid = value.length >= 10;
            fieldValidationErrors.telnumber = telnumberValid ? '' : 'Ошибка в написани номера телефона';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        commentTextValid: commentTextValid,
                        firstnameValid: firstnameValid,
                        lastnameValid: lastnameValid,
                        telnumberValid: telnumberValid
                      }, this.validateForm);
      }
      validateForm() {
        this.setState({formValid: this.state.emailValid &&
                                  this.state.commentTextValid &&
                                  this.state.firstnameValid &&
                                  this.state.lastnameValid &&
                                  this.state.telnumberValid
                                });
      }




    loadRegions() {
        const axiosConfig = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'mode': 'no-cors'
      
          }
      
      }
      
      
      
          Axios.get('http://localhost:8080/regions', axiosConfig)
          .then(response => {
      
              if (response.status != 200){
                  console.log("ERRORRRRRR!!");
      
      
              } else {
                  console.log(response.data);
                  this.setState({regions: response.data});
                  console.log(this.state);
                  // this.setState({load: true});
                  // this.setState({Userlist: response.data});
                  // console.log(this.state.Userlist[0].id);
                  // this.state.Userlist.map((user) => console.log(user.id));
                  // console.log(JSON.parse(this.state.Userlist));
                  // console.log(JSON.parse(response.data))
      
              }
      
          })
      }


      loadCities(value) {
        const axiosConfig = {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'mode': 'no-cors'
      
          }
      }
      this.setState({region: value});
      
      
      
          Axios.get('http://localhost:8080/cities?region=' + value, axiosConfig)
          .then(response => {
      
              if (response.status != 200){
                  console.log("ERRORRRRRR!!");
      
      
              } else {
                  console.log(response.data);
                  this.setState({cities: response.data});
                  console.log(this.state);
                  // this.setState({load: true});
                  // this.setState({Userlist: response.data});
                  // console.log(this.state.Userlist[0].id);
                  // this.state.Userlist.map((user) => console.log(user.id));
                  // console.log(JSON.parse(this.state.Userlist));
                  // console.log(JSON.parse(response.data))
      
              }
      
          })
      }


      onSubmit = () => {

        const {lastname, firstname, middlename, commentText, region, email, telnumber, city} = this.state;

        var data = {
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            middlename: this.state.middlename,
            commentText: this.state.commentText,
            region: this.state.region,
            email: this.state.email,
            telnumber: this.state.telnumber,
            city: this.state.city
        }

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode': 'no-cors',

            }
          };


        Axios.post('http://localhost:8080/comment', JSON.stringify(data), axiosConfig)
        .then(response => {
            // this.setState({regState: true});
            
            
                // console.log(response.status);


                console.log("STATUS: " + response.status);
                
            }
        )
      }


      onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
    }

      render(){


          if (this.state.regions == 0){
            this.loadRegions();
          }
        return (
            <Grid container style={bodyStyle} spacing={0}>

            <form onSubmit={this.onSubmit} className="col-8 mt-4 shadow p-3 mb-5 bg-white rounded">
            <p class="mt-1 mb-3 font-weight-light text-primary h2 mx-auto bg-white rounded">Форма</p>

            <div>

                <FormErrors formErrors={this.state.formErrors} />
            </div>
            <Grid item md={12} style={{marginTop: 24}}>
                <TextField
                    name="lastname"
                    style={{marginRight: 12}}
                    type="text"
                    id="outlined-basic" 
                    label="Фамилия" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.lastname}
                    placeholder="Введите фамилию"
                /><TextField
                    type="text"
                    name="firstname"
                    style={{marginLeft: 12}}
                    id="outlined-basic" 
                    label="Имя" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.firstname}
                    placeholder="Введите имя"
                />
                <TextField
                    style={{marginLeft: 12}}
                    name="middlename"
                    type="text"
                    id="outlined-basic" 
                    label="Отчество" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.middlename}
                    placeholder="Введите отчество"
                />
            </Grid>
            <Grid item md={12} style={{marginTop: 24}}>
                {/* <TextField
                    style={{marginRight: 12}}
                    name="username"
                    type="text"
                    id="outlined-basic" 
                    label="Логин" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.username}
                    placeholder="Введите логин"
                />
                <TextField 
                    type="password"
                    name="password"
                    style={{marginLeft: 12}}
                    id="outlined-basic" 
                    label="Пароль" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.password}
                    placeholder="Введите пароль"
                /> */}
                
                <Autocomplete
                            id="combo-box-demo"
                            options={this.state.regions}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => this.loadCities(value)}
                            style={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Регион" variant="outlined" />}
                />
                        <Autocomplete
                            id="combo-box-demo"
                            options={this.state.cities}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => this.setState({city: value})}
                            style={{ width: 200, marginTop: 30 }}
                            renderInput={(params) => <TextField {...params} label="Город" variant="outlined" />}
                        />
            </Grid>
            <Grid item md={12} style={{marginTop: 24}}>
                <TextField 
                    type="text"
                    name="email"
                    style={{marginRight: 12}}
                    id="outlined-basic" 
                    label="E-mail" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.email}
                    placeholder="Введите email"
                />
                
<InputMask
  mask="+7(999)999 99 99"
  type="text"
  
  style={{marginLeft: 12}}
  id="outlined-basic" 
  label="Номер телефона" 
  variant="outlined"
  onChange={this.onChange}
  value={this.state.telnumber}
  placeholder="Введите номер телефона"
  disabled={false}
  maskChar=" "
>
  {() => <TextField name="telnumber" variant="outlined" placeholder="Введите номер телефона"/>}
</InputMask>

                {/* <TextField 
                    type="text"
                    ref="phone"
                    name="telnumber"
                    style={{marginLeft: 12}}
                    id="outlined-basic" 
                    label="Номер телефона" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.telnumber}
                    placeholder="Введите номер телефона"
                />
                     */}
            </Grid>


                    <Grid item md={12} style={{marginTop: 24}}>
                <TextField 
                    type="text"
                    name="commentText"
                    // style={{marginLeft: 12}}
                    style={{ width: 300}}
                    id="outlined-basic" 
                    label="Текст" 
                    variant="outlined"
                    onChange={this.onChange}
                    value={this.state.commentText}
                    placeholder="Напишите Ваш комментарий"
                />  

            </Grid>
        

                    {/* <button type="submit" class="btn btn-primary mx-auto">Зарегистрироваться</button> */}
                <input 
                    type="submit" 
                    value="Отправить" 
                    className="btn"
                    disabled={!this.state.formValid}
                    style = {buttonStyle}
                />

                    


                     </form>


                     
                     </Grid>
          );
      }
}



const buttonStyle = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    marginTop: 24,
    padding: '0 30px',
}

const formStyle = {
    align: 'center'
}

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}


export default Comment;
