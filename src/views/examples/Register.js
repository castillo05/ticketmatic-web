/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

import {customAxios} from '../../axiosUtils';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*+/\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      form:{
        nombre:'',
        mail:'',
        id_tipouser:2,
        pass:''
      },
      alert:{
        type:'',
        status:false,
        text:''
      },
      levelPassword:{
        color:'',
        status:false,
        text:''
      }
    }
  }

  handleKeyDown=e=>{
    this.levelPass()
    
  }

  levelPass=(e)=>{
    if(strongRegex.test(this.state.form.pass)){
      
      this.setState({
        levelPassword:{
          state:true,
          color:'text-success',
          text:'Fuerte'
        }
      })
     
    }else if(mediumRegex.test(this.state.form.pass)){
      this.setState({
        levelPassword:{
          state:true,
          color:'text-warning',
          text:'Media'
        }
      })
     
    }else{
      
      this.setState({
        levelPassword:{
          state:true,
          color:'text-danger',
          text:'Debil'
        }
      })
      
    }
  }
  
  hamdleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    })
  }

  saveUser=e=>{
    e.preventDefault()
    customAxios('/users',this.state.form,'post','application/json').then(ress=>{
      console.log(ress.status)
      if(ress.status===200){
        this.setState({
          alert:{
            type:'danger',
            status:true,
            text:ress.data.message
          }
        })
      }else if(ress.status===201){
        this.props.history.push('/auth/login')
      }
      
    }).catch(error=>{
      console.log(error)
      const response = error.response
     if(response){
         Object.values(response.data).forEach(element => {
        //  console.log(element[0])
          
         this.setState({
          alert:{
            type:'danger',
            status:true,
            text:element
          }
        })
      });
     }
    
      
    })
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Registrarse</small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.hamdleChange} name="nombre" placeholder="Name" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" onChange={this.hamdleChange} name="mail" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onKeyUp={this.handleKeyDown} onChange={this.hamdleChange} name="pass" placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onKeyUp={this.handleKeyDown} onChange={this.hamdleChange} name="password_confirmation" placeholder="Password Confirmation" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup> */}
                {this.state.alert.status && 
                  <Alert color={this.state.alert.type}>
                    {this.state.alert.text}
                  </Alert>
                }
                 <div className="text-muted font-italic">
                  <small>
                    Seguridad de la contraseña:{" "}
                   
                      <span className={this.state.levelPassword.color}>{this.state.levelPassword.text}</span>
                   
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      {/* <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label> */}
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button onClick={this.saveUser} className="mt-4" color="primary" type="button">
                    Crear Cuenta
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
