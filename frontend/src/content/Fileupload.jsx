import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'

function Fileupload(){
    const [fileData,setFileData]=useState("")
    const onFileChange=(e)=>{
        setFileData(e.target.files[0])
    }
    const onFileupload=(e)=>{
        e.preventDefault()

        const data=new FormData()
        data.append("file",fileData)

        Axios.post("http://localhost:3000/upload",data).then((res)=>{
            alert("File Upload Successfull")
        })
    }
    return(
        <div>
            <h1 align="center">File Upload</h1>
            <div className="d-flex justify-content-center">
                <form method="POST" onSubmit={onFileupload}>
                    <input type="file" className="form-control" onChange={onFileChange}/>
                    <button type="submit" className="btn btn-primary my-5">Upload</button>
                </form>

            </div>
        </div>
    )
}
export default Fileupload