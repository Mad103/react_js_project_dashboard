import React, {useState, useEffect} from 'react'
import Joi from 'joi-browser';

function PersonForm(props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });
    const [errors, setErrors] = useState([]);
    const formSchema = {
            name: Joi.string().required().max(30).min(5),
            email: Joi.string().email({minDomainAtoms: 2}).required().max(30).min(8),
            age: Joi.string().required(),
    };

    useEffect(() => {
        let selectedId = props.match.params.id;
        if(selectedId){
            getAUser(selectedId);
        }
      
        async function getAUser(id) {
            let result = await fetch(
              `https://60ffab42bca46600171cf435.mockapi.io/persons/${id}`
            );
            let data = await result.json();
            if(result.status === 200){
                setFormData(data);
            }
          }
    }, [])

    const handleFormChange = (e) => {
        let validationResult = Joi.validate(formData, formSchema);
        validationResult.errors && setErrors(validationResult.error.details);
        let newFormData = {...formData};
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationResult = Joi.validate(formData, formSchema);
        validationResult.errors && setErrors(validationResult.error.details);
        const createUser = async() =>{
            let result = await fetch("https://60ffab42bca46600171cf435.mockapi.io/persons", {
                method: "POST",
                body: JSON.stringify(formData),                                  //stringfy---to convert object into JSON
                headers: {"content-Type": "applicaition/json"}
                },
            );
            console.log(result);
        }
        // createUser();
    }
    console.log(errors);

    const handleBackward = () => {
        props.history.goBack();
        // props.history.push("/counter");
    }
    
    
    return (
        <div>
             <button onClick={handleBackward} className="btn btn-secondary">Back</button>
            <form onChange={handleFormChange} onSubmit={handleSubmit} className="person-form mt-5 border p-5 rounded shadow-sm">
                {
                    errors.length !== 0 &&
                        errors.map((error) => (
                            <div class="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                        ))
                }
                
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input name="name" type="text" className="form-control error-red" value={formData.name}/>
                    </div>
                </div>
                 <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input name="email" type="text" className="form-control" value={formData.email}/>
                    </div>
                </div> <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">
                        Age
                    </label>
                    <div className="col-sm-10">
                        <input name="age" type="text" className="form-control" value={formData.age} />
                    </div>
                </div>
                <div className="mt5- row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">
                    </label>
                    <div className="col-sm-10">
                        <input type="submit" className="btn btn-secondary" id="staticEmail" value="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
