import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText,ButtonToggle,Alert } from 'reactstrap';
import {customAxios} from '../../axiosUtils';

class FormData extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            users:[],
            form:{
                id_user:null,
                ticket_pedido:''
            },
            alert:{
                type:'',
                status:false,
                text:''
              }
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
    
    saveTicket=e=>{
        e.preventDefault()
        let token = localStorage.getItem('token');
        customAxios('/ticket',this.state.form,'post','application/json',token).then(result=>{
            
            if(result.data.status){
                console.log(result.data.status)
                this.setState({
                    alert:{
                        type:'success',
                        status:true,
                        text:result.data.status
                    }
                })
            }
        }).catch(error=>{
            const response = error.response
            console.log(response.data.error)
        })
    }

    
    getUsers=e=>{
        let token = localStorage.getItem('token');
       
        customAxios('/users',{},'get','application/json',token).then(ress=>{
            console.log(ress)
            this.setState({users:ress.data})
        }).catch(error=>{
            const response = error.response
            console.log(response.data.error)
        })
    }
    componentDidMount(){
        this.getUsers()
    }
    render() { 
        return ( 
            <div>
               <Form>
                   <FormGroup>
                   <Label for="exampleSelect">asignar a:</Label>
                        <Input onChange={this.handleChange} name="id_user" type="select" id="exampleSelect">
                        <option>Elija un usuario</option>
                        {this.state.users.map(u=>
                            <option value={u.id} key={u.id}>{u.name}</option>
                        )}
                        </Input>
                   </FormGroup>
                   <FormGroup>
                       <Label>Descripción</Label>
                        <Input
                            onChange={this.handleChange} 
                            type="text"
                            name="ticket_pedido"
                            id="ticket_pedido"
                            placeholder="Descripción"
                        />
                   </FormGroup>
                   {this.state.alert.status && 
                  <Alert color={this.state.alert.type}>
                    {this.state.alert.text}
                  </Alert>
                }
                   <ButtonToggle onClick={this.saveTicket} color="primary">Guardar Ticket</ButtonToggle>
               </Form>
            </div>
         );
    }
}
 
export default FormData;