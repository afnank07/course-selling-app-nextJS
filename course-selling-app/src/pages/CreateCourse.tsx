import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = useState("");
    // const [title, setTitle] = useRecoilState(titleAtom);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [published, setPublished] = useState("");
    const [jwToken, setJwToken] = useState("");

    // const navigate = useNavigate();
    const route = useRouter();

    useEffect(()=>{
        // const token = JSON.parse(window.localStorage.getItem('MY_JWT_TOKEN'));
        // setJwToken(token);
    },[])

    function submit(){
        // console.log("Fetched Token: ", jwToken)
        axios.post("/api/admin/courses", {title, description, price, imageLink, published}, {
            headers: { 'Authorization': 'Bearer '+ jwToken}
        }).then((resp)=>{
            // console.log(resp.data);
            alert(resp.data.message)
        }).catch(err=> console.log(err));
    }

    return (
        <div >
            <div style={{display:'flex', justifyContent:'center', paddingTop:150, marginBottom:10}}>
            <Typography variant={"h6"}>Create Course Page</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{padding:20, width:400}}>
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Title" 
                        variant="outlined" 
                        onChange={(e)=>setTitle(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Description" 
                        variant="outlined"
                        onChange={(e)=>setDescription(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Price" 
                        variant="outlined"
                        onChange={(e)=>setPrice(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="ImageLink" 
                        variant="outlined"
                        onChange={(e)=>setImageLink(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Published" 
                        variant="outlined"
                        onChange={(e)=>setPublished(e.target.value)}/>
                    <br /> <br />
                    <Button variant="contained" onClick={submit}>Submit</Button>
                    <Button variant="contained" onClick={ () => {route.push('../courses')}}
                        style={{marginLeft:10}}
                    >Show Courses</Button>
                </Card>
            </div>
        </div>
    )
}
export default CreateCourse;