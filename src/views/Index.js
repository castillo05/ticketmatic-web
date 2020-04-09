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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";



import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.token=localStorage.getItem('token');
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.state = {
      isLogout:false,
      activeNav: 1,
      chartExample1Data: "data1"
    };
  
  }

  // Validar Identity
  verifiedIdentity=()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
    if(!token){
        this.props.history.push('/auth')
    }
    
}

componentDidMount(){
    this.verifiedIdentity();
}
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
         
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">

            </Col>
           
          </Row>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br>
        </Container>
      </>
    );
  }
}

export default Index;
