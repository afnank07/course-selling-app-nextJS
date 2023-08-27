import { useState } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { userTypeAtom } from "../atom/userTypeAtom";
import { useRecoilState } from "recoil";
import { useRouter } from 'next/router';

export default function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const router = useRouter();

    async function registerUser(){
        let ROUTE_URL = "/api/user/signup";
        console.log("userType: ",userType);
        if (userType === "Admin") ROUTE_URL = "/api/admin/signup";
        try{
            const resp = await axios.post(ROUTE_URL, {
                "username": email,
                "password": password
            })
            
            // console.log("resp: ", resp.data.message);
            // console.log("resp: ", resp.data.token);
            // window.localStorage.setItem('MY_JWT_TOKEN', JSON.stringify(resp.data.token));
            alert(resp.data.message + "\n\nPlease Sign-in using the same credentials!");

            router.push("./")

            // if (userType === "Admin"){
            //     router.push("./ShowCourses")
            //     // window.location.replace('http://localhost:3000/ShowCourses');
            // } else {
            //     router.push("./")
            //     // window.location.replace('http://localhost:3000/');
            // }

        } catch(err) {
            // alert(err.response.data.message);
            console.log("err: ", err);
        }
    }


    return (
        <div >
            <div style={{display:'flex', justifyContent:'center', paddingTop:150, marginBottom:10}}>
            <Typography variant={"h6"}>Welcome! SignUp below.</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{padding:20, width:400}}>
                Sign up as <Select
                        value={userType}
                        label="Age"
                        sx = {{minWidth:150}}
                        onChange={(e)=>{
                            setUserType(e.target.value)
                        }}
                        >
                        <MenuItem value={'User'}>User</MenuItem>
                        <MenuItem value={'Admin'}>Admin</MenuItem> 
                    </Select>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    <br /> <br />
                    <TextField 
                        fullWidth={true} 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <br /> <br />
                    <Button size={'large'} variant="contained" onClick={registerUser}>SignUp</Button>
                </Card>
            </div>
        </div>
    )
}

// export async function getServerSideProps(context){
//     const session = await getServerSession(context.req, context.res, authOptions);
//     console.log("session: ", session)
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }

//     return {
//         props: {
//             session,
//         },
//     }

// }