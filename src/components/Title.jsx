import React, {useState,useEffect} from 'react';

function Title() {
    const [title, setTitle] = useState("Hello");
    const [name, setName] = useState("Mohit");

    useEffect(() => {
        //statement to executed when component is constructed or updated
        console.log("use effect called");
        return () => {
            //statement to be executed when component is unmounted
        }
    },[title, name]);                                                                      //[]---dependency list.....agr ye emoty h to iska mtlb ye ek baar hii chkega jbb omponent construct hoga
    const titleChanged = (e) => {
        setTitle(e.target.value);
    };
    const nameChanged = (e) => {
        setName(e.target.value);
    };

    return (
        <div>
            console.log("Rendered");
            <h1>Title - {title}</h1>
            <h1>Name - {name}</h1>
            <input onkeyUp={titleChanged} type="text" />
            <input onKeyUp={nameChanged} type="text" />
        </div>
    )
}

export default Title; 
