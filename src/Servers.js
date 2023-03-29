import React, { Component } from 'react';
import AppNav from './AppNav';
import './App.css';
import {Table,Container, Input, Button, Label, Form, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom';


class Servers extends Component {

    emptyItem = {
        id : '',
        name : '',
        language :'',
        framework :'',

    }

    constructor(props){
        super(props)

        this.state = {
            isLoading: false,
            Servers : [],
            item: this.emptyItem
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }




    async handleSubmit(event){
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/servers', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },

            body : JSON.stringify(item),

        })

        console.log(this.state)
        this.props.history.push("/servers");
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(this.state);

    }

    async remove(id){
        await fetch('/api/delete/'+id,{
                method : 'DELETE',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }

            }).then(()=>{
                let updatedServers = [...this.state.Servers].filter(i => i.id !== id);
                this.setState({Servers : updatedServers});
            });
    }

    async componentDidMount(){
        const response = await fetch('/api/servers');
        const body = await response.json();
        this.setState({Servers : body,isLoading : false})
    }

  
     handleChange
     
    render() {
        
        const title = <div><h3><strong>Add Server</strong></h3></div>;
        const {Servers,isLoading} = this.state;

        if(isLoading){
            return(<div>Loading....</div>)
        }


        let rows =
            Servers.map(servers =>
                <tr key={servers.id}>
                    <td>{servers.id}</td>
                    <td>{servers.name}</td>
                    <td>{servers.language}</td>
                    <td>{servers.framework}</td> 
                    <td><Button size="sm" color="danger" onClick={ () => this.remove(servers.id)}>Delete</Button></td>
                </tr>    
            )


        return (
            
            <div>
                <AppNav/> 

                
                <Container>

                    <div><br/></div>
                    {title}
                    <Form onSubmit = {this.handleSubmit}>

                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleChange}/>
                         </FormGroup>  

                         <FormGroup>
                            <Label for="language">Language</Label>
                            <Input type="text" name="language" id="language" onChange={this.handleChange}/>
                         </FormGroup>  

                         <FormGroup>
                            <Label for="framework">Framework</Label>
                            <Input type="text" name="framework" id="framework" onChange={this.handleChange}/>
                         </FormGroup>  
                         

                         <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link}  to="/"> Cancel </Button>
                         </FormGroup>  

                    </Form> 

                </Container>

        {' '}  

            <Container>
                <div><br/></div>
                <h3><strong>Server List</strong></h3>

                <Table className="mt-4">

                    <thead>
                        <tr>
                            <th width="10%">Id</th>
                            <th width="10%">Name</th>
                            <th width="10%">Language</th>
                            <th width="10%">Framework</th>
                            <th width="10%">Remove</th>
                        </tr>    
                    </thead>

                    <tbody>
                        {rows}
                    </tbody>        

                </Table>    
            </Container>              
             
            </div>    
         );
    }
}
 
export default Servers;