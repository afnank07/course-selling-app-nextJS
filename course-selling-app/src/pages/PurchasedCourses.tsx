import axios from 'axios';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Card, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { courseIdAtom, courseTitleAtom, courseDescriptionAtom, 
    coursePriceAtom, courseImageLinkAtom, coursePublishedAtom } from "../atom/courseAtom";
import { userTypeAtom } from './../atom/userTypeAtom';

const PurchasedCourses = () => {
    const [courses, setCourses] = useState([]);
    const userType = useRecoilValue(userTypeAtom);

    useEffect(()=>{
        let ROUTE_URL = "/api/user/purchasedCourses";

        axios.get(ROUTE_URL, {
            // headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
        }).then(resp => {
            // console.log("resp: ", resp);
            // console.log("resp: ", JSON.parse(resp))
            setCourses(resp.data);
        }).catch(err => console.log(err));
    },[]);

  return (
    <div>
        <Grid container spacing={1}>
        <div style={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
        {/* <div> */}
        {courses.map(c => <Course 
            title={c.title}
            description={c.description}
            price={c.price}
            imageLink={c.imageLink}
            published={c.published}
            id={c._id}
        />)}
        
        </div>
        </Grid>
     </div>
  )
}

function Course(props) {
    return <div>
        <Grid item lg={12} xs={2} md={2} style={{ padding: 30 }}>
        {/* <div style={{ padding: 30 }} > */}
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia sx={{ height:200, objectFit: "contain"}}
                component="img"
                image={props.imageLink}
                title={props.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                    <Typography gutterBottom  variant="body2" color="text.secondary" component="div">{props.description}</Typography>
                    <Typography variant="h5">{props.price}/-</Typography>
                    <Typography variant="h5">{props.published}</Typography>
                </CardContent>
            </Card>
        {/* </div> */}
        </Grid>
    </div>

}

export default PurchasedCourses