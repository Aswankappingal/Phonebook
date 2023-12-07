import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
  const navigate=useNavigate()
  const {id}=useParams()


  const [val,setval]=useState({
    name: '',
    number: ''

  })



  const getDatas=async()=>{
    const res=await axios.post(`http://localhost:3002/api/fulldetails/${id}`)
  
      setval(res.data)
      console.log(val);
    
    
  }
  console.log("name",val);
  
  useEffect(()=>{
    getDatas()
  },[])


  const getdata=(e)=>{
    setval((pre)=>({...pre,[e.target.name]:e.target.value}))
   
  }



  const editTask=async(e)=>{
    e.preventDefault()
    console.log(val);
    const res=await axios.patch(`http://localhost:3002/api/edittask/${id}`,{...val})
  if(res.status!=200){
    console.log(res.status);
    alert("Data not Edited")
  }
  else{
    alert("Data Edited")
    navigate("/")
  
  }
  }
  












  return (
    <div>
      <form action="" onSubmit={editTask}>
      <div className="main-card">
        <h2>Phone Book</h2>
        <div><input type="text" placeholder='Name'   value={val.name} onChange={getdata} name='name'/></div>
        <div><input type="text" placeholder='Number' value={val.number} onChange={getdata} name='number'/></div>
        <div><button>Register</button></div>

       
      </div>






      </form>
    </div>
  )
}

export default Edit
