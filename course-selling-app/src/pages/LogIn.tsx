import { useState } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { userTypeAtom } from "../atom/userTypeAtom";
// import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useRecoilState(userTypeAtom);
    const { data: session } = useSession()
    // const navigate = useNavigate();
    // const route = useRouter();

    async function loginUser(){
        let ROUTE_URL = "http://localhost:3000/user/login";
        if (userType === "Admin") ROUTE_URL = "http://localhost:3000/admin/login";

        try{
            // console.log("userType: ", userType);
            const resp = await axios.post(ROUTE_URL, {}, {
                headers: {
                    'username': email,
                    'password': password
                }
            })
            // console.log(resp.data.message);
            window.localStorage.setItem('MY_JWT_TOKEN', JSON.stringify(resp.data.token));
            alert(resp.data.message);
            // Redirect to 'about' page
            // navigate('./about')
            if (userType === "Admin"){
                window.location.replace('http://localhost:5173/about');
            } else {
                window.location.replace('http://localhost:5173/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div >
            <div style={{display:'flex', justifyContent:'center', paddingTop:150, marginBottom:10}}>
            <Typography variant={"h6"}>Welcome back! SignIn below.</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{padding:20, width:400}}>
                {/* <FormControl halfwidth> */}
                Login as <Select
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
                {/* </FormControl> */}
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
                    <Button size={'large'} variant="contained" onClick={loginUser}>SignIn</Button>
                </Card>
            </div>
        </div>
    )
}

export default SignIn; 