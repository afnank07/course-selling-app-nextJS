import axios from 'axios';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Card, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { courseIdAtom, courseTitleAtom, courseDescriptionAtom, 
    coursePriceAtom, courseImageLinkAtom, coursePublishedAtom } from "../atom/courseAtom";

function EditCourses () {
    const courseId = useRecoilValue(courseIdAtom);
    const [courseTitle, setCourseTitle] = useRecoilState(courseTitleAtom);
    const [courseDescription, setCourseDescription] = useRecoilState(courseDescriptionAtom);
    const [coursePrice, setCoursePrice] = useRecoilState(coursePriceAtom);
    const [courseImageLink, setCourseImageLink] = useRecoilState(courseImageLinkAtom);
    const [coursePublished, setCoursePublished] = useRecoilState(coursePublishedAtom);

    const [editTitle, setEditTitle] = useState(courseTitle);
    const [editDescription, setEditDescription] = useState(courseDescription);
    const [editPrice, setEditPrice] = useState(coursePrice);
    const [editImageLink, setEditImageLink] = useState(courseImageLink);
    const [editPublished, setEditPublished] = useState(coursePublished);
    const [JwToken, setJwToken] = useState("");


    useEffect(()=>{
        // const token = JSON.parse(window.localStorage.getItem('MY_JWT_TOKEN'));
        // setJwToken(token);
    },[])


    async function getCourseData(){
        try{
            let data = { 
                "title": courseTitle, 
                "description": courseDescription, 
                "price": coursePrice, 
                "imageLink": courseImageLink, 
                "published": coursePublished }

            const resp = await axios.put("/api/admin/courses/"+courseId, data, {
                headers: {'Authorization' : 'Bearer '+ JwToken }
            })
            alert(resp.data.message);
        } catch(err){
            console.log(err);
        }
    }


  return (
    <div>
        <div style={{display:'flex', padding:150 }}>
        <div style={{paddingRight:100, paddingLeft:100}}>
            <Card variant="outlined" style={{padding:20, width:400}}>
                <TextField variant='outlined' label='Edit Title' fullWidth={true} onChange={(e)=>{setEditTitle(e.target.value)}} />
                <TextField variant='outlined' label='Edit Description' fullWidth={true} onChange={(e)=>{setEditDescription(e.target.value)}} />
                <TextField variant='outlined' label='Edit Price' fullWidth={true} onChange={(e)=>{setEditPrice(e.target.value)}} />
                <TextField variant='outlined' label='Edit ImageLink' fullWidth={true} onChange={(e)=>{setEditImageLink(e.target.value)}} />
                <TextField variant='outlined' label='Edit Published' fullWidth={true} onChange={(e)=>{setEditPublished(e.target.value)}} />
                <CardActions>
                    <Button size="small" onClick={()=>{
                        getCourseData();
                    }}>Save</Button>
                    <Button size="small" onClick={()=>{
                        if (editTitle) setCourseTitle(editTitle);
                        if (editDescription) setCourseDescription(editDescription);
                        if (editPrice) setCoursePrice(editPrice);
                        if (editImageLink) setCourseImageLink(editImageLink);
                        if (editPublished) setCoursePublished(editPublished);
                    }}>Preview</Button>
                </CardActions>
            </Card>
        </div>
        <div>
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia sx={{ height:200, objectFit: "contain"}}
                component="img"
                image={courseImageLink}
                title={courseTitle} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{courseTitle}</Typography>
                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div">{courseDescription}</Typography>
                    <Typography variant="h5">{coursePrice}/-</Typography>
                    <Typography variant="h5">{coursePublished}</Typography>
                </CardContent>
            </Card>
        </div>
        </div>
    </div>
  )
}

export default EditCourses