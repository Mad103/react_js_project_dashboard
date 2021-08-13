import React, {useState, useEffect} from 'react'
import {paginate, sorting} from "./utils/utils"; 
import Swal from "sweetalert2";
import queryString from "query-string";
import {Link} from 'react-router-dom';

let allPersons = [];
function Persons(props) {
    let queryData = queryString.parse(props.location.search);

    const [persons, setPersons] = useState([]);
    const [pageSize, setPagesize] = useState(10);
    const [currentPage, setCurrentPage] = useState(2);
    const [sortColumn, setSortColumn] = useState(queryData.sortBy ? queryData.sortBy : "id");
    const [sortOrder, setSortOrder] = useState(queryData.sortOrder ? queryData.sortOrder : "asc");
    const [refresh, setRefresh] = useState(false);

    let totalLinks = Math.ceil(persons.length /pageSize);
    let linksArray = [];
    //converting total links to an array
    for(let i=0; i<totalLinks; i++){
        linksArray.push(i); 
    }

    //paginate the results
    let data = paginate(persons, pageSize, currentPage);
    //sort the result
    data = data.length && sorting(data, sortColumn, sortOrder);

    const handlePageChange = (linkNo) => {
        if(linkNo === 'next') setCurrentPage(currentPage + 1);
        else if(linkNo === 'previous') setCurrentPage(currentPage - 1);
        else setCurrentPage(linkNo);
    }

    const handleSorting = (key) => {
        setSortColumn(key);
        setSortOrder(`${sortOrder === 'asc' ? 'desc' :'asc'}`);
    }
    
    const handleSearch = (e) => {
        let searchKeyword = e.target.value;
        let filtered = allPersons.filter((person) => {
            person = person.name.toLowerCase();
            return (person.startsWith(searchKeyword.toLowerCase()) || person.search(searchKeyword.toLowerCase()) !== -1);
        });
        setPersons(filtered);
    }
    
    const handleDelete = (id) => {
        let copy = [...data];
        async function deletePerson(id) {
            let result = await fetch(`https://60ffab42bca46600171cf435.mockapi.io/persons/${id}`, 
                {method: "DELETE"},
            );
            if(result.status === 200){
                Swal.fire({
                    podition: "top-end", 
                    icon: "success",
                    title: "User has been delete",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            else{
                Swal.fire({
                    podition: "top-end", 
                    icon: "error",
                    title: "Something went wrong..",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setPersons(copy);
            }
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "This user will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletePerson(id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              setRefresh(!refresh);
            }
          });
    };
    

    useEffect(() => {
        //HTTP REQUESTS
        //get --- to fetch the info from server
        //push --- to store the info on the server
        //put --- tp update the info on server
        //delete --- to delete info on server
        
        // fetch("https://60ffab42bca46600171cf435.mockapi.io/persons")                                               
        // .then(result=>result.json())                                                                 
        // .then(data=>setPersons(data));
        // console.log(persons);

        async function getPersons(){
            let result = await fetch("https://60ffab42bca46600171cf435.mockapi.io/persons");
            let data = await result.json();
            allPersons = data;
            setPersons(data);
        };
        getPersons();
    },[refresh]);
    
    
    return (
        <div>
            <h2>Persons</h2>
           <div className="m-table">
               <div className="mb-3 mt-3 search-bar">
                   <input onKeyUp={handleSearch} type="text" className="form-control" id="exampleFormControlInput1" placeholder="search" />
               </div>
               {/* <a href="/persons/new" >                                        ye page kp reload krr deta h jbkii link reload nhi krta
                    <button className="btn btn-primary">New Person</button> 
                </a> */}
               <Link to={`${props.match.path}/new`}>
                    <button className="btn btn-primary">New Person</button>
               </Link>
           <table className="table table-striped "> 
                <thead>
                    <th onClick={() => handleSorting(`id`)}>
                        Id{" "}
                        <span>
                            <i class={`${sortColumn === 'id' && sortOrder === 'desc'? "fas fa-arrow-up desc-arrow": "fas fa-arrow-up" }`}></i>
                        </span>
                        </th>
                    <th onClick={() => handleSorting(`name`)}>
                        Name{" "}
                        <span>
                            <i class={`${sortColumn === 'name' && sortOrder === 'desc'? "fas fa-arrow-up desc-arrow": "fas fa-arrow-up" }`}></i>
                        </span>
                    </th>
                    <th>Avatar</th>
                    <th onClick={() => handleSorting(`age`)}>
                        Age{" "}
                        <span>
                            <i class={`${sortColumn === 'age' && sortOrder === 'desc'? "fas fa-arrow-up desc-arrow": "fas fa-arrow-up" }`}></i>
                        </span>
                        </th>
                    <th onClick={() => handleSorting(`email`)}>
                        Email{" "}
                        <span>
                            <i class={`${sortColumn === 'email' && sortOrder === 'desc'? "fas fa-arrow-up desc-arrow": "fas fa-arrow-up" }`}></i>
                        </span>
                        </th>
                    <th>Verified <input type="checkbox"/></th>
                </thead>
                <tbody>
                    {   data.length &&
                        data.map(person => (
                            <tr>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td><img className="profile-pic" src={person.avatar} alt="" /></td>
                                <td>{person.age}</td>
                                <td>{person.email}</td>
                                <td>{person.isVerified ? 'Verified' : 'NotVerified'}</td>
                                <td><button onClick={() => handleDelete(person.id)} className="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
           </div>
            <div className="paginated-links mt-5">
                <ul className="pagination">
                    <li onClick={() => handlePageChange('previous')} className="page-item" >
                        <a className="page-link" href="#">
                            Previous
                        </a>
                    </li>
                    {
                        linksArray.map((link) => (
                            <li onClick={() => handlePageChange(link)} className={`page-item ${link === currentPage && "active"}`}>
                                <a className="page-link" href="#">
                                    {link +1}
                                </a>
                            </li>
                        ))
                    }
                    <li onClick={() => handlePageChange('next')} className="page-item">
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>  
            </div>
        </div>
    );
}

export default Persons
