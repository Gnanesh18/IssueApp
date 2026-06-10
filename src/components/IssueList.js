import React,{useState,useEffect} from "react";
import axios from 'axios';

function IssueList(){
    const[issues,setIssues]=useState([]);
    
    const fetchIssues=async()=>{
        try{
            const res= await axios.get('http://localhost:5000/api/issues');
            setIssues(res.data);
        }catch(error){
            alert("Error fetching the issues");
            console.log(error);
        }
    };

    const deleteIssues=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/issues/${id}`);
            //update State Immediately
            setIssues(prevIssues=>prevIssues.filter(issue=>issue._id!==id));
        }catch(error){
            alert("error in deleting issue");
            console.log(error);
        }
    }

    const updateStatus=async(id,newStatus)=>{
        try{
            await axios.put(`http://localhost:5000/api/issues/${id}`,{status:newStatus});
            //update only that issue's status in state 
            setIssues(prevIssues=>
                prevIssues.map(issue=>
                    issue._id===id?{...issue,status:newStatus}:issue
                )
            );
        }catch(error){
            alert("error in Updating issue");
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchIssues();
       // window.dispatchEvent(new Event("issueCreated"));
    },[]);
return(

    <div className="issue-list">
        <h2 className="issue-list">Issues</h2>
        {issues.length===0 && <p>No issues found</p>}
        {issues.map((issue)=>(
            <div key={issue._id} className="issue-card">
                <h3>{issue.title}</h3>
                <p><strong>Description:</strong>{issue.description}</p>
                <p><strong>Due:</strong>{issue.due}</p>
                <p><strong>Owner:</strong>{issue.owner}</p>
                <p><strong>Priority:</strong>{issue.priority}</p>
                <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status-badge ${
                        issue.status==='Open'?'status-open':
                        issue.status==='In progress'?'status-in-progress':
                        'status-resolved'
                    }`}>
                    {issue.status}
                    </span>
                </p>
                <div className="issue-button">
                    <button className="status-in-progress " onClick={()=>
                        updateStatus(issue._id,'In Progress')}>In progress
                        </button>
                    <button className="status-resolved"onClick={()=>
                        updateStatus(issue._id,'Resolved')}>Resolved
                        </button>
                    <button className="delete-btn"onClick={()=>
                        deleteIssues(issue._id)}>Delete
                        </button>
                </div>
                </div>
        ))}
    </div>
);
}

export default IssueList;