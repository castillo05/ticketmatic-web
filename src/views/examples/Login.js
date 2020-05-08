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
  Alert,
  Spinner
} from "reactstrap";

// Custom Axios Utils
import {customAxios} from '../../axiosUtils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      form:{
        mail:'',
        pass:''
      },
      alert:{
        type:'',
        status:false,
        text:''
      },
      loading:false
    }
  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    })
  }

  submit=e=>{
    e.preventDefault();
    //this.setState({loading:true})
    customAxios('/users/login',this.state.form,'post').then(ress=>{
      console.log(ress)
      if(ress.data.message){
        this.setState({
          alert:{
            type:'danger',
            status:true,
            text:ress.data.message
          },
          loading:false
        })
      }else{
        localStorage.setItem('token',JSON.stringify(`${ress.data.token}`));
      localStorage.setItem('identity',JSON.stringify(ress.data.user));
     
      this.setState({loading:false,alert:{status:false}})
      this.props.history.push('/admin')
      }
      
    }).catch(error=>{
      const response = error.response
      console.log(error)
      this.setState({
        alert:{
          type:'danger',
          status:true,
          text:response.data.error
        },
        loading:false
      })
    })
  }
  
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Iniciar Sesion</small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
             
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.handleChange} name="mail" placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.handleChange} name="pass" placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                 
                </div>
                {this.state.alert.status && 
                  <Alert color={this.state.alert.type}>
                    {this.state.alert.text}
                  </Alert>
                }
               
                <div className="text-center">
                  <Button onClick={this.submit} className="my-4" color="primary" type="button">
                    {this.state.loading ? <Spinner type="grow" color="success" /> :  'Iniciar Sesion'}
                  
                   
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

export default Login;
