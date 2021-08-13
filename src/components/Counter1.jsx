import React, { Component } from 'react'

export default class Counter1 extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.count}</h2>
                <button onClick={()=> this.props.onIncrement(this.props.id)} className="btn btn-primary">Increment</button>
                <button className="btn btn-secondary">Decrement</button>
            </div>
        )
    }
}
