import React, { Component } from 'react'

class Heading extends React.Component{
    cities = ["Chandigarh", "Mohali"];
    render() {
        return (
            <>
            {/* <h1>I am a heading Component.</h1> */}
            {/* <ul>
                {
                    this.cities.map((i) => (
                        <li>{i}</li>
                    ))
                }
            </ul> */}

            {/* props  --- these are same as state but used when the data is incoming from outside the component */}
            <h1>Name ---- Mr. {this.props.name}</h1>
            <h1>Age ---- {this.props.age}</h1>
            <h1>Location ---- {this.props.location}</h1>
            </>
        )
    }
};

export default Heading;
