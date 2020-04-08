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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {customAxios} from '../../axiosUtils';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.state={
      tickets:[]
    }
  }

  getTickets=e=>{
    let token = localStorage.getItem('token');
    
    if(this.identity.id_tipousuario===1){
        customAxios('/tickets',{},'get','application/json',token).then(ress=>{
        console.log(ress.data)
        this.setState({
          tickets:ress.data
        })
      }).catch(error=>{
        const response = error.response
        console.log(response.data.error)
      })
    }else{
      customAxios(`/ticket/${this.identity.id}`,{},'get','application/json',token).then(ress=>{
        console.log(ress)
        this.setState({
          tickets:ress.data.tickets
        })
      }).catch(error=>{
        const response = error.response
        console.log(response.data.error)
      })
    }
    
  }
  // Validar Identity
  verifiedIdentity=()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token)
    if(!token){
       return this.props.history.push('/auth')
    }
    this.getTickets()
}


    componentDidMount(){
        this.verifiedIdentity();
    }

  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Tickets</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                   
                    <tr>
                      <th scope="col">Ticket #</th>
                      {this.identity.id_tipousuario===1?<th scope="col">Usuario</th>:null}
                      <th scope="col">Descripción</th>
                      
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.tickets.map(t=>
                      <tr key={t.id}>
                     
                      <td>{t.id}</td>
                      {this.identity.id_tipousuario===1?
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            {t.name}
                          </Badge>
                        </td> : null
                      }
                      <td>
                        {t.ticket_pedido}
                      </td>
                      
                     
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                           
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>   
                  )}
                   
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  
                </CardFooter>
              </Card>
            </div>
          </Row>
         
        </Container>
      </>
    );
  }
}

export default Tables;
