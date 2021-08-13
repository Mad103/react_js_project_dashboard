import React, { Component } from 'react'
import movies from "../arrrayofObject"

export default class Movies extends Component {
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>In Stock</th>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => (
                                <tr>
                                    <td>{movie.id}</td>
                                    <td>{movie.name}</td>
                                    <td>{movie.price}</td>
                                    <td>{movie.inStock}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
