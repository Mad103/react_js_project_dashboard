import React, { Component } from 'react';
import queryString from "query-string";

export default class Cities extends Component {

    state = {
        cities: ["Chandigarh", "Mohali", "Delhi"],
    };

    addCity= (e) => {                                           //yaha arrow function hii bnana h
        if(e.code === 'Enter'){
            this.setState({cities: [...this.state.cities, e.target.value]});
            e.target.value = "";
        }
    };

    deleteCity = (city) => {
        let newCities = [...this.state.cities];
        newCities = newCities.filter(i => i !== city);
        this.setState({cities: newCities});                              //setState({jisko change krna h, jo hmme show krna h change krke})
    }
    
    render() {
        return (
            <div>
                {
                    this.state.cities.map((city) => (
                        <h1 key={city}>{city} <button onClick={() => this.deleteCity(city)}>Delete</button></h1>
                    ))
                }            
                <input onKeyUp={this.addCity} type="text" />
            </div>
        )
    }
}
