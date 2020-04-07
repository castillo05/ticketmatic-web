import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText,ButtonToggle } from 'reactstrap';
import {customAxios} from '../../axiosUtils';

class FormData extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            users:[]
         }
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
                        <Input type="select" name="select" id="exampleSelect">
                        <option>Elija un usuario</option>
                        {this.state.users.map(u=>
                            <option value={u.id} key={u.id}>Jorge</option>
                        )}
                        </Input>
                   </FormGroup>
                   <FormGroup>
                       <Label>Descripción</Label>
                        <Input
                            type="text"
                            name="ticket_pedido"
                            id="ticket_pedido"
                            placeholder="Descripción"
                        />
                   </FormGroup>

                   <ButtonToggle color="primary">Guardar Ticket</ButtonToggle>
               </Form>
            </div>
         );
    }
}
 
export default FormData;