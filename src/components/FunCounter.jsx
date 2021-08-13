import React, {useState} from 'react';

//isme na to this ka use hoga or na hii render ka sidha return krwana h
//yaha state ka use nhi hoga react hooks ka use hoga
function FunCounter() { 
    let [count, setCount] = useState(10);                                              //useState---hook of react {isko hmme import bhi krna pdta h, ye ek function hota h jisme hmm initial value dete h jo count me chlii jatii h aur setCount me ek function chla jayega jo count kii value change krega}
 
    const increment = () => {
        setCount(count +1);
    };
    const decrement = () => {setCount(count -1);};

    return <div>    
        <h2>{count}</h2>
        <button onClick= {increment} className="btn btn-primary">Increment</button>
        <button onClick={decrement} className="btn btn-secondary">Decrement</button>
    </div>
}

export default FunCounter;
