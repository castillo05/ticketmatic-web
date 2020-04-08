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
import { Link } from "react-router-dom";

class Tables extends React.Component {
  _isMount=false;
  constructor(props) {
    super(props);
    this.token = JSON.parse(localStorage.getItem('token'));
    this.identity=JSON.parse(localStorage.getItem('identity'));
    this.state={
      tickets:[]
    }
  }

  getTickets=e=>{
    this._isMount=true;
    let token = localStorage.getItem('token');
    if(this._isMount){
        if(this.identity.id_tipousuario===1){

          customAxios('/tickets',{},'get','application/json',token).then(ress=>{
          console.log(ress.data)
          if(ress.data.status==='Token is Expired'){
            this.props.history.push('/auth')
          }
          this.setState({
            tickets:ress.data
          })
        }).catch(error=>{
          const response = error.response
          console.log(error)
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
   
    
  }
  // Eliminar Ticket
  detele=(id,e)=>{
    customAxios('/ticket/'+id,{},'delete','application/json',this.token).then(ress=>{
      console.log(ress)
      this.getTickets()
    }).catch(error=>{
      const response = error.response
      console.log(response.data.error)
    })
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
    componentWillUnmount(){
      this._isMount=false;
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
                          {this.identity.id_tipousuario===1?
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                             
                              onClick={e=>this.detele(t.id,e)}
                            >
                              Eliminar
                            </DropdownItem>
                            
                            <DropdownItem
                             
                             onClick={e=>e.preventDefault()}

                           >
                             
                             <Link to={`/ticket/${t.id}`}>
                             Editar
                             </Link>
                           </DropdownItem>
                              
                          </DropdownMenu>: null}
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
