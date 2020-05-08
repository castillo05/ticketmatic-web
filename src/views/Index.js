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

import {customAxios} from '../axiosUtils';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Header from "components/Headers/Header.js";

const options = {
  title: {
    text: 'Estadisticas'
  },
  series: [{
    type: 'line',
    data: [1, 2, 3]
  }]
}

class Index extends React.Component {
  constructor(props){
    super(props);
    this.token = JSON.parse(localStorage.getItem('token'));
    this.token=localStorage.getItem('token');
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.state = {
      isLogout:false,
      activeNav: 1,
      chartExample1Data: "data1",
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        title: {
          text: 'Numero de tickets por usuarios'
        },
        xAxis: {
          categories: ['A', 'B', 'C'],
        },
        yAxis: {
          title: {
              text: 'Numero de tickets'
          }
      },
        series: [
          { data: [] }
        ],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          }
        },
        responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      },
      plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    }
      },
      hoverData: null
    };
  
  }

  // Extraer Informacion de tickets
  getCount=()=>{
    customAxios('/countticket',{},'get','application/json',this.token).then(ress=>{
      
      const nameuser=[];
      const countticket=[];
      ress.data.forEach(element => {
        nameuser.push(element.name);
        countticket.push(element.countid);

        this.setState({ 
                
          chartOptions: {
              xAxis: {
                  categories: nameuser,
                },
            series: [
              {
                 data: countticket
              }
            ]
          }
        });
      });
    }).catch(error=>{
      console.log(error)
    })
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }
 

 

  // Validar Identity
  verifiedIdentity=()=>{
    const token = JSON.parse(localStorage.getItem('token'));
   
    if(!token){
        this.props.history.push('/auth')
    }
    
}

componentDidMount(){
    this.verifiedIdentity();
    //this.getCount()
}
 
  render() {
    
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
         
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
            {this.identity.id_tipousuario===1 ? 
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions}
              /> : null
            }
           
           
            </Col>
           
          </Row>
          
        </Container>
      </>
    );
  }
}

export default Index;
