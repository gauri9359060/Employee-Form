import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    isMarried: false,
  });

  const [employee , setEmployee] = useState([])
  const handleChange = (e) => {
    const { id, value ,type, checked} = e.target;

    setFormData({
        ...formData,
        [id] : type  === "checkbox" ? checked : value
    })
  };

  React.useEffect=(()=>{
    getData();
  },[])

  const getData = () =>{
    fetch(`http://localhost:3001/employeeData`)
      .then((res)=>res.json())
      .then((res)=>setEmployee(res))
      .catch((err)=>console.log(err))
      
  }
  const { name, age, department, address, salary, isMarried } = formData;

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const payload ={
      name,
      age,
      address,
      department,
      salary,
      isMarried,
    }

    const jsonpayload = JSON.stringify(payload)
    fetch('http://localhost:3001/employeeData', {
      method: 'POST',
      body: jsonpayload,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res)=>{
      getData();
    }).then((err)=>console.log(err))
  };
  


  return (
    <div>
      <h1>Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          id="name"
          type="text"
          onChange={handleChange}
          value={name}
        />
        <br />
        <br />
        <input
          placeholder="Age"
          id="age"
          type="number"
          onChange={handleChange}
          value={age}
        />
        <br />
        <br />
        <input
          placeholder="Address"
          id="address"
          type="text"
          onChange={handleChange}
          value={address}
        />
        <br />
        <br />
        
        <label>
          Department:
          <select onChange={handleChange} id="department" value={department}>
            <option value="">select</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
        <br />
        <br />

        <input
          type="number"
          placeholder="Salary"
          id="salary"
          onChange={handleChange}
          value={salary}
        />
        <br />
        <br />

        <label>
          Is Married:
          <input type="checkbox" onChange={handleChange} id="isMarried"  value={isMarried} />
        </label><br/><br/>

        <input type="submit" value="SUBMIT" />
        {
        employee.map((item,idx)=>{
            return <div key={idx}>
                <table>
                <tbody>
                  <tr style={{border:"1px solid black"}}>
                    <td style={{border:"1px solid black"}}>{item.name}</td>
                    <td style={{border:"1px solid black"}}>{item.age}</td>
                    <td style={{border:"1px solid black"}}>{item.address}</td>
                    <td style={{border:"1px solid black"}}>{item.department}</td>
                    <td style={{border:"1px solid black"}}>{item.salary}</td>
                    <td style={{border:"1px solid black"}}>{item.isMarried ? "Yes" : "No"}</td>
                  </tr>
                  </tbody>
                </table> 
            </div>
        })
      }
      </form>
            
     
    </div>
  );
};

export { Form };
