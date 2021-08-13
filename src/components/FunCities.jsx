import React, {useState} from 'react'
import Cities from './Cities';
import queryString from "query-string";

export default function FunCities(props) {
    console.log(props.location.search);
    let queryData = queryString.parse(props.location.search);
    console.log(queryData);

    const [cities, setCities] = useState(["Delhi", "Chandigarh", "Srinagar"]);
    const updateCities = (e) => {
        if(e.code === "Enter") {
            setCities([...cities, e.target.value]);
        }        
    }
    
    return (
        <div>
            {
                cities.map(city => <h2 kay={city}>{city}</h2>)
                
            }
            <input onKeyUp={updateCities} type="text" />
        </div>
    )
}
