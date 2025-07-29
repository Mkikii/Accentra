import React, {useState, useEffect} from "react";

const AddTenantForm = ({tenantsURL, tenants, setTenants}) => {
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState()

  function handleSubmit(){
    const formData ={
      name,
      unit,
      phone,
      email,
      userId
    }
    fetch(tenantsURL,{
      method : "POST",
      headers:{
        "Content-Type": "Application/json",
        "Accept": "Application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data)=>{
      alert("Tenant has been added!")
      setTenants([...tenants, data])
      resetForm()
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input 
          type="text"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          required
        />
        <br />

        <label>Unit:</label>
        <br />
        <input type="text"
          value={unit}
          onChange={(e) => {setUnit(e.target.value)}}
          required
        />
        <br />
        <label>Phone:</label>
        <br />
        <input type="text"
          value={phone}
          onChange={(e) => {setPhone(e.target.value)}}
          required
        />
        <br />

        <label>Email:</label>
        <br />
        <input type="text"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          required
        />
        <br />

        <label>User ID:</label>
        <br />
        <input type="text"
          value={userId}
          onChange={(e) => {setUserId(Number(e.target.value))}}
          required
        />
        <br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddTenantForm