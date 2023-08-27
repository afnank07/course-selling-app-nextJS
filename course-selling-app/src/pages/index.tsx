// import Typography from '@mui/material/Typography';
import { Box, Card, MenuItem, Select, styled, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userTypeAtom } from "@/atom/userTypeAtom";
import { useEffect } from "react";
import axios from "axios";

function Landing({session}){
    // const session = useSession();
    // useEffect(()=>{
    //   setUserType("")
    // }, [])
    const router = useRouter();
    // const [userType, setUserType] = useRecoilState(userTypeAtom);
    // const username = session?.user?.email

    // useEffect(()=>{
    //   // const username = session?.user?.email
    // axios.get("/api/common/check/"+username, {}).then(resp => {
    //     console.log("resp.data: ", resp.data.role)
    //     setUserType(resp.data.role);
    //   }).catch(err => {
    //     // console.log("userType: ", userType)
    //     // console.log("err: ", err.response.data.message)})
    //     console.log("err: ", err)})
    // }, []);

    console.log("session index: ", session)
    console.log("session index: ", session?.user?.email)
    const CustomCard = styled(Card)(({ theme }) => ({
      // display: "flex",
      justifyContent: "center",
      backgroundColor: "#E6F0FF",
      gap: theme.spacing(5),
      marginTop: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
    }));

    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        // justifyContent: "center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        },
      }));
    
      const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
          fontSize: "40px",
        },
      }));
    
      return (
        <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
          <Container>
            {/* <Navbar /> */}
            <CustomBox>
              <Box sx={{ flex: "1" }}>
                {/* <Typography
                  variant="body2"
                  sx={{
                    fontSize: "18px",
                    color: "#687690",
                    fontWeight: "500",
                    mt: 10,
                    mb: 4,
                  }}
                >
                  Welcome to Smart Courses website!
                </Typography> */}
                <Title variant="h1">
                  Discover a place where you'll love to learn.
                </Title>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                >
                  Unlock Your Potential: Explore our diverse range of online courses on our platform, designed to enhance your skills and knowledge. From coding to creative arts, our user-friendly website offers expert-led courses, empowering learners to thrive in their personal and professional journeys.
                </Typography>                
              </Box>
    
              <Box sx={{ flex: "1.25" }}>
                <img
                  src="/hero_illustration.png"
                  alt="heroImg"
                  style={{ maxWidth: "100%", marginBottom: "2rem" }}
                />
              </Box>
              
            </CustomBox>
              {/* <CustomBox>
                <Box sx={{ display: "flex", flex: "1" }}>
                  <CustomCard variant="outlined" style={{padding:20, width:600}}>
                    <Typography
                    variant="body2"
                    sx={{
                      fontSize: "18px",
                      color: "#687690",
                      fontWeight: "500",
                      paddingBottom:1
                    }}
                  >
                    Welcome to Coursify website!
                  </Typography>
                    <Box sx={{ display: "flex", flex: "1" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "18px",
                          color: "#687690",
                          fontWeight: "500",
                          padding: 2,
                          my:-2
                        }}
                      >
                        New here?  
                      </Typography>
                      <Button size={'large'} variant="contained" sx={{height:40}} onClick={(e)=>{router.push("./SignUp")}}>SignUp</Button>
                    </Box>
                    <br /> <br />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "18px",
                          color: "#687690",
                          fontWeight: "500",
                          padding: 2,
                          paddingBottom:5,
                          my:-2
                        }}
                      >
                        Already registered?  
                      </Typography>
                    <Box sx={{ display: "flex", flex: "1", gap:2 }}>
                      <br /> <br />
                      <Button size={'large'} variant="contained"  onClick={(e)=>{router.push("./SignUp")}}>SignUp</Button>

                      <Button size={'large'} variant="contained" onClick={async (e)=>{
                        await setUserType("User")
                        signIn()
                        }}>SignIn as User</Button>
                      <Button size={'large'} variant="contained" onClick={async(e)=>{
                        await setUserType("Admin")
                        signIn()
                        }}>SignIn as Admin</Button>
                    </Box>
                  </CustomCard>
                </Box>
              </CustomBox> */}
          </Container>
        </Box>
      );
    };

export default Landing;

export async function getServerSideProps(context){
  // console.log("context in getServerSideProps: ", context)
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("session in getServerSideProps: ", session)
  // if (!session) {
  //     return {props: {
  //       session,
  //   }}
  // }

  // Replace undefined values with null in user object
  if (session && session.user) {
    if (session.user.name === undefined) {
      session.user.name = null;
    }
    if (session.user.image === undefined) {
      session.user.image = null;
    }
    // You can do the same for other properties if needed
  }

//   function soem() {return {
//     props: {
//         session: session || {
//           user : null
//         },
//     },
// }}

// const {defr} = soem()
//   console.log("defr: ", defr)
//   console.log("soem(): ", soem())

  return {
      props: {
          session: session || {
            user : null
          },
      },
  }

}