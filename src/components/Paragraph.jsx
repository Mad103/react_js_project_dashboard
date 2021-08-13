import React, { Component } from 'react'

export default class Paragraph extends Component {
    // person = {id: 12, name: 'Abc', location: 'Mohali'};
    
    state = {                                        //vo info aayegi iske ander jo runtime pe change hogi
        name: "mohit",                               //jbb bhi state k ander ka code run hoga to pura ka pura dom refresh hoga aur new values k sath render hoga 
    };
    
    nameChanged = (e) => {
        this.setState({name: e.target.value});             //setState is a function using which we can change the value of state
    }

    render() {
        return (
            <div>
                {/* <h2>id = {this.person.id}</h2>
                <h2>name = {this.person.name}</h2>
                <h2>location = {this.person.location}</h2> */}
                <h1>{this.state.name}</h1>
                <h1>{this.state.name}</h1>
                <h1>{this.state.name}</h1>
                <h1>{this.state.name}</h1>
                <h1>{this.state.name}</h1>
                <h1>{this.state.name}</h1>
                <input onKeyUp={this.nameChanged} type="text" />
            </div> 
        );
       
    }
}

//states---it is a information which is private to component and which will change its state in runtime