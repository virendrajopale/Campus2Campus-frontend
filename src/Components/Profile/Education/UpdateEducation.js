import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { displayEducation, updateEducation } from "../../../redux/Actions/StudentAction";
const UpdateEducationt=({})=>{
    const navigate=useNavigate();
  
    const { education} = useSelector(state=>state.profile);
     const dispatch=useDispatch();
    const {pid,id}=useParams();



   
    var p1=education && education.educations && education.educations.find((edu)=>edu._id===id);
    // console.log(p1);
    const [edu,setedu]=useState({
        title:p1?.title,
        school:p1?.school,
        start_year:p1?.start_year,
        end_year:p1?.end_year,
        percentage:p1?.percentage
    });
    const handle_change=(event)=>{
        setedu({...edu,[event.target.name]:event.target.value});
    }
    
    useEffect(()=>{
        
        dispatch(displayEducation(pid))
    },[dispatch,pid])
    
    const submitUpdEdu=()=>{


       dispatch(updateEducation({id,edu}));
        navigate('/user/profile')
    }
    return (
        <>
            <form style={{marginTop:"80px",marginLeft:"50px"}}>
            <h2>Add Education</h2>
            <h6>Title and description must have minimum length of 5 characters</h6>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Education Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" disabled="true" value={edu?.title} onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">School/College/University</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={edu?.school} name="school" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Starting Year</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={edu?.start_year} name="start_year" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Ending Year(completed or expecting to complete)</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={edu?.end_year} name="end_year" onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Overall Percentage/CGPA</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" value={edu?.percentage} name="percentage" onChange={handle_change}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={submitUpdEdu}>Submit</button>
            </form>
        </>
    )
}

export default UpdateEducationt;