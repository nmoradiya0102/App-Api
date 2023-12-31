import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

const App1 = () => {
  const fname = useRef()
  const lname = useRef()
  const [ view , setview ] = useState({})
  const [ data , setdata ] = useState([])
  const [ index , setindex ] = useState()

  const arr = JSON.parse(localStorage.getItem("detail")) || []

  useEffect(() => {
    setdata([...arr])
  }, [])

  const Submit_Handle = () => {
    const input = {
      fname : fname.current.value,
      lname : lname.current.value,
    }
    arr.push(input)
    localStorage.setItem("detail" , JSON.stringify(arr))
    setdata([...arr])
  }

  const View_Handler = (ind) => {
    setview(arr[ind])
    setindex(ind)
  }

  const Update_Inpute_Handler = (e) =>{
    setview({...view , [e.target.name] : e.target.value})
  }

  const Update_Handle = () => {
    arr.splice(index , 1 , view)
    localStorage.setItem("detail" , JSON.stringify(arr))
    setdata([...arr])
    Swal.fire({
      title : "update successfully..!",
      text : "youn clicked ok button..",
      icon : "success"
    })
  }

  const Delete_Handler = (ind) => {
    arr.splice(ind , 1)
    localStorage.setItem("detail" , JSON.stringify(arr))
    setdata([...arr])
    Swal.fire({
      title : "Delete successfully..!",
      text : "you clicked ok button..",
      icon : "success"
    })
  }
  return (
    <>
    <div>
      <input type='text' name='fname' ref={fname}/>
      <input type='text' name='lname' ref={lname}/>
      <button type='button' onClick={Submit_Handle}>Submit</button>
    </div>
    <div>
      <input type='text' name='fname' value={view.fname} onChange={Update_Inpute_Handler}/>
      <input type='text' name='lname' value={view.lname} onChange={Update_Inpute_Handler}/>
      <button type='button' onClick={Update_Handle}>Update</button>
    </div>
    {
      data?.map((val , ind) => {
        return(
          <>
          <h1>{val.fname}</h1>
          <h3>{val.lname}</h3>
          <button onClick={() => Delete_Handler(ind)}>Delete</button>
          <button onClick={() => View_Handler(ind)}>Update</button>
          </>
        )
      })
    }
    </>
  )
}

export default App1