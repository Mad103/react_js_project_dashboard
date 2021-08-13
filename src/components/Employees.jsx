import React, {useEffect , useState} from 'react';
import {paginate,sorting} from "./utils/employ";
import queryString from "query-string";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

let allUsers = [];
function Employees(props)
{
  let queryData =  queryString.parse(props.location.search);
const [employees, setEmployees]= useState([]);
const  [pageSize,setPageSize]= useState(10);
const [currentPage,setCurrentPage] = useState(1);
const [sortColumn, setSortColumn] = useState(
	queryData.sortBy ? queryData.sortBy : "id",
);
const [sortOrder, setSortOrder] = useState(

   queryData.sortOrder ? queryData.sortOrder : "asc",

);
	const [refresh, setRefresh] = useState(false);

let totalLinks = Math.ceil(employees.length / pageSize);
let linksArray =[];
//converting total links to an array

for(let i = 0 ; i<totalLinks ; i++) 

linksArray.push(i);

//paginate the results

let data =  paginate(employees,pageSize,currentPage);
console.log("Before sorting", data);
	//sort the results
	data = data.length && sorting(data, sortColumn, sortOrder);
	console.log("after sorting", data);

const handlePageChange = (linkNo) =>{
    if (linkNo === "next") setCurrentPage(currentPage + 1);
	else if (linkNo === "previous") setCurrentPage(currentPage - 1);
    setCurrentPage(linkNo);
};

useEffect(() => {
		async function getEmployees() {
			let result = await fetch(
				
                     "https://61016dac4e50960017c29e2b.mockapi.io/employdata",
			);
			let data = await result.json();
            allUsers = data;
			setEmployees(data);
		}
		getEmployees();
	}, [refresh]);

    const handleSorting = (key) => {
		setSortColumn(key);
		setSortOrder(`${sortOrder === "asc" ? "desc" : "asc"}`);
	};
   
	const handleSearch = (e) => {
		let searchKeyword = e.target.value;
		let filtered = allUsers.filter((user) => {
			user = user.name.toLowerCase();
			return (
				user.startsWith(searchKeyword.toLowerCase()) ||
				user.search(searchKeyword.toLowerCase()) != -1
			);
		});
		console.log(filtered);
		setEmployees(filtered);
	};

    const handleDelete = (id) => {
		let copy = [...data];
		async function deleteemployee(id) {
			let result = await fetch(
				`https://60efff36f587af00179d3c01.mockapi.io/employdata/${id}`,
				{
					method: "DELETE",
				},
			);
			if (result.status === 200) {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "User has been delete",
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					position: "top-end",
					icon: "error",
					title: "Something went wrong..",
					timer: 1500,
				});
				setEmployees(copy);
			}
		}
		Swal.fire({
			title: "Are you sure?",
			text: "This user will be deleted!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Delete",
		}).then((result) => {
			let filtered = data.filter((user) => user.id !== id);
			setEmployees(filtered);
			if (result.isConfirmed) {
				deleteemployee(id);
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
				setRefresh(!refresh);
			}
		});
	};
	console.log(refresh);
	const approve =(e)=>{

   let verify = allUsers.filter(
   (user)=>user.approved===e.target.checked,

   );
   setEmployees(verify);
	}

    return (
     <div>
         
         <div className="m-table">
				<div class="mb-3 mt-5 search-bar">
					<input
						onKeyUp = {handleSearch}
						type="email"
						class="form-control"
						id="exampleFormControlInput1"
						placeholder="Search the employee..."
					/>
				</div>
                        	<Link to="/EmployForm">
					<button className="btn btn-primary ml-auto">New Employee +</button>
				            </Link>

        <table className ="table table-dark">
        <thead className="table-light" >
<tr>

	                       <th onClick={() => handleSorting(`id`)}>Id
						   <span>
									<i
										class={` ${
											sortColumn === "id" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
						   </th>
						   
							<th onClick={() => handleSorting(`name`)}>
								Name{" "}
								<span>
									<i
										class={` ${
											sortColumn === "name" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th>Avatar</th>
							<th onClick={() => handleSorting(`email`)}>
								E-mail
								<span>
									<i
										class={` ${
											sortColumn === "email" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th onClick={() => handleSorting(`token`)}>
								Token Number
								<span>
									<i
										class={` ${
											sortColumn === "token" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th>
							Registration Status <input type="checkbox" onClick= {approve} />
							</th>
							
</tr>
        </thead>
               <tbody>
               {data.length && data.map((employees)=> (
                   
            <tr key={employees.id}>
           <td>{employees.id}</td>
           <td>{employees.name}</td>
           <td><img className="profile-picture" src= {employees.avatar} alt=" "></img></td>
            <td>{employees.email}</td>
            <td>{employees.token}</td>
            <td> {employees.approved ? "Registered" : "Not Registered"}</td>
               <td>
										<button
											onClick={() => handleDelete(employees.id)}
											className="btn btn-danger">
											<i class="fas fa-trash"></i>
										</button>
									     
				
			    </td>
             
              </tr>
               ))}
     </tbody>
     </table>
</div>
<div className="paginated-links mt-3">
				<ul class="pagination">
					<li onClick={() => handlePageChange("previous")} class={`page-item `}>
						<a class="page-link" href="#">
							Previous
						</a>
					</li>
					{linksArray.map((link) => (
						<li
							onClick={() => handlePageChange(link)}
							class={`page-item ${link === currentPage && "active"}`}>
							<a class="page-link" href="#">
								{link + 1}
							</a>
						</li>
					))}
					<li onClick={() => handlePageChange("next")} class={`page-item `}>
						<a class="page-link" href="#">
							Next
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Employees;