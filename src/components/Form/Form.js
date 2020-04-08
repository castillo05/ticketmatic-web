import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText,ButtonToggle,Alert } from 'reactstrap';
import {customAxios} from '../../axiosUtils';

// Components
import Header from 'components/Headers/Header';


class FormData extends Component {
    _isMount=false;
    constructor(props) {
        super(props);
        console.log(props)
        this.token = localStorage.getItem('token');
       
        const identity=JSON.parse(localStorage.getItem('identity'));
       
        if(identity.id_tipousuario===2){this.props.history.push('/auth')}
       
        this.state = { 
            users:[],
            ticket:[],
            form:{
                id:null,
                id_user:null,
                name:'',
                ticket_pedido:''
            },
            formUpdate:{
                id:null,
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
            this.setState({
                alert:{
                  type:'danger',
                  status:true,
                  text:response.data.error
                }
              })
        })
    }

    
    getUsers=e=>{
        this._isMount=true;
        let token = localStorage.getItem('token');
       
        customAxios('/users',{},'get','application/json',token).then(ress=>{
            if(this._isMount){
                 console.log(ress)
                this.setState({users:ress.data})
            }
           
        }).catch(error=>{
            const response = error.response
            console.log(response.data.error)
        })
    }

    getTicket=e=>{
        this._isMount=true;
        let token = localStorage.getItem('token');
       
        customAxios('/getticket/'+this.props.match.params.id,{},'get','application/json',token).then(ress=>{
            if(this._isMount){
                 console.log(ress.data[0])
                 this.setState({
                     form:{
                         id:ress.data[0].id,
                         id_user:ress.data[0].id_user,
                         name:ress.data[0].name,
                         ticket_pedido:ress.data[0].ticket_pedido
                     }
                })
            }
           
        }).catch(error=>{
            const response = error.response
            console.log(response.data.error)
        })
    }

    // Editar Ticket
    updateTicket=()=>{
        customAxios('/ticket/'+this.props.match.params.id,this.state.form,'put','application/json',this.token).then(ress=>{
            console.log(ress)
            this.props.history.goBack();
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
    this.getUsers()
    if(this.props.match.params.id){
        this.getTicket()
    }
    
}


    componentDidMount(){
        this.verifiedIdentity();
        
    }

    componentWillUnmount(){
        this._isMount=false;
    }
    render() { 
        if(!this.token){
            this.props.history.push('/auth')
        }
        return (
            <> 
            <Header />
            <div>
               <Form>
                   <FormGroup>
                   <Label for="exampleSelect">asignar a:</Label>
                        <Input onChange={this.handleChange} name="id_user" type="select" id="exampleSelect">
                        <option>Elija un usuario</option>
                        {this.state.users.map(u=>
                        this.state.form.id_user===u.id?
                            <option selected value={this.state.form.id_user===u.id?this.state.form.id_user:u.id} key={this.state.form.id_user===u.id?this.state.form.id_user:u.id}>{this.state.form.id_user===u.id?this.state.form.name:u.name}</option>
                        :<option value={u.id} key={u.id}>{u.name}</option>
                        
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
                            defaultValue={this.state.form.ticket_pedido}
                        />
                   </FormGroup>
                   {this.state.alert.status && 
                  <Alert color={this.state.alert.type}>
                    {this.state.alert.text}
                  </Alert>
                }
                {this.props.match.params.id ?
                    <ButtonToggle onClick={this.updateTicket} color="warning">Editar Ticket</ButtonToggle>
                    :<ButtonToggle onClick={this.saveTicket} color="primary">Guardar Ticket</ButtonToggle>
               
                }
                   </Form>
            </div>
            </>
         );
    }
}
 
export default FormData;