import React from 'react'
import SearchIcon from "../../images/search-icon.png"
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

const UserList = () => {

    const [getUserData, setUserData] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");


    //for printing all the users from the database
    const getdata = async () => {

        const res = await fetch("http://localhost:8000/getUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("Users could not be fetched.");
        }
        else {
            setUserData(data)
            console.log("All Users have been fetched properly.");
        }
    }


    React.useEffect(() => {
        getdata();
    }, []);


    const deleteUser = async (id) => {

        const res2 = await fetch(`http://localhost:8000/deleteUser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deleteData = await res2.json();
        console.log(deleteData);

        if (res2.status === 422) {
            console.log("Data could not be deleted.");
        }
        else {
            console.log("Data has been deleted.");
            getdata();
        }
    }

    const checkDelete = (id) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: "User will be removed permanently!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No ',
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
            }
          })
    }

    return (
            <div className="container list-section mt-4">
                <div className="add_btn mt-2 mb-4">
                    <div>
                        <img src={SearchIcon} alt="" width="30px" height="30px" />
                        <input className="search-button" type="search" placeholder="Search..." aria-label="Search" onChange={(e) => { setSearchTerm(e.target.value) }} />
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr className="attribute-row">
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Department Id</th>
                            <th className="stock-attribute" scope="col">Phone No</th>
                            <th className="action-attribute" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getUserData && getUserData.filter((element) => {
                                if (searchTerm === "") {
                                    return element;
                                }
                                else if (element.name.toLowerCase().includes(searchTerm.toLowerCase()) || element.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return element;
                                }
                            }).map((element, id) => {
                                return (
                                    <tr className="record-row" key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{element.name} </td>
                                        <td>{element.department}</td>
                                        {/* <td>{element.quantityReceived}</td> */}
                                        <td>{element.departmentId}</td>
                                        <td>xxxx</td>
                                        <td className="d-flex justify-content-between">
                                            <NavLink to={`view/${element._id}`}> <button className="btn btn-outline-success">Details</button></NavLink>
                                            <NavLink /*to={`edit/${element._id}`}*/>  <button className="btn btn-outline-primary">Issued Books</button></NavLink>
                                            <button className="btn btn-outline-danger" onClick={() => checkDelete(element._id)}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default UserList