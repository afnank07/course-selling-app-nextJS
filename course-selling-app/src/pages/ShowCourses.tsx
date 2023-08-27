import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react"
// import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { courseIdAtom, courseTitleAtom, courseDescriptionAtom, coursePriceAtom, courseImageLinkAtom, coursePublishedAtom } from "../atom/courseAtom";
import { userTypeAtom } from './../atom/userTypeAtom';
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function ShowCourses({session}) {

    console.log("session - in ShowCourses: ", session)
    const [courses, setCourses] = useState([]);
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    // const [courseId, setCourseId] = useRecoilState(courseIdAtom);
    // const navigate = useNavigate();
    const username = session?.user?.email
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    useEffect(()=>{

        axios.get("/api/common/check/"+username, {}).then(resp => {
            console.log("resp.data: ", resp?.data?.role)
            setUserType(resp?.data?.role);
          }).catch(err => {console.log(err)})


        let ROUTE_URL = "/api/user/courses";
        if (userType === "Admin") ROUTE_URL = "/api/admin/courses";

        axios.get(ROUTE_URL, {
            // headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
        }).then(resp => {
            // console.log("resp: ", resp);
            // console.log("resp: ", JSON.parse(resp))
            setCourses(resp.data);
        }).catch(err => console.log(err));
    },[]);

    return <div>
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
}

function Course(props) {
    // const navigate = useNavigate();
    const route = useRouter();
    const userType = useRecoilValue(userTypeAtom);
    const [courseId, setCourseId] = useRecoilState(courseIdAtom);
    const [courseTitle, setCourseTitle] = useRecoilState(courseTitleAtom);
    const [courseDescription, setCourseDescription] = useRecoilState(courseDescriptionAtom);
    const [coursePrice, setCoursePrice] = useRecoilState(coursePriceAtom);
    const [courseImageLink, setCourseImageLink] = useRecoilState(courseImageLinkAtom);
    const [coursePublished, setCoursePublished] = useRecoilState(coursePublishedAtom);

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
                <CardActions>
                    {userType=='Admin' && <Button size="small" onClick={ () => {
                        setCourseId(props.id)
                        setCourseTitle(props.title)
                        setCourseDescription(props.description)
                        setCoursePrice(props.price)
                        setCourseImageLink(props.imageLink)
                        setCoursePublished(props.published)
                        route.push('../edit')
                        }}>Edit</Button>}
                    {userType=='User' && <Button size="small" onClick={ async () => {
                        setCourseId(props.id)
                        try{
                            // console.log("props.id: ", props.id)
                            const resp = await axios.post("http://localhost:3000/user/courses/"+String(props.id),{}, {
                                headers: { 'Authorization': "Bearer " + JSON.parse(window.localStorage.getItem("MY_JWT_TOKEN")) }
                            })
                            alert(resp.data.message);
                        } catch (err){
                            console.log(err)
                        }
                        // navigate('../purchased')
                        }}>Purchase</Button>}
                </CardActions>
            </Card>
        {/* </div> */}
        </Grid>
    </div>

}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log("session: ", session)

    if (session && session.user) {
        if (session.user.name === undefined) {
          session.user.name = null;
        }
        if (session.user.image === undefined) {
          session.user.image = null;
        }
        // You can do the same for other properties if needed
      }

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }

}