import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userTypeAtom } from "../atom/userTypeAtom";
import { useSession, signIn, signOut } from "next-auth/react";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

function AppBar() {
  const [email, setEmail] = useState(null);
  // const navigate = useNavigate();
  const [userType, setUserType] = useRecoilState(userTypeAtom);
  const router = useRouter();
  // useSession is a hook used on the client side, when the control reaches here, a request is sent out '/session' 
  // which will basically get back if the user is authenticated or not
  const { data: session, status } = useSession();

  console.log("status: ", status)
  console.log("session - AppBar 1 : ", session)
  console.log("session?.user?.email: ", session?.user?.email)
  
  const username = session?.user?.email
  
  // useEffect(()=>{
    console.log("username - AppBar  : ", username);
  axios.get("/api/common/check/"+username, {}).then(resp => {
      console.log("resp.data: ", resp?.data?.role)
      setUserType(resp?.data?.role);
    }).catch(err => {console.log(err)})
  // }, []);

  if (session?.user?.email) {
    console.log("session - AppBar 2 : ", session);
    console.log("userType - AppBar 2 : ", userType);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Smart Courses</h2>
        <div>
          {userType == "Admin" && (
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                router.push("./CreateCourse");
              }}
            >
              Add Courses
            </Button>
          )}
          {userType == "User" && (
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                router.push("./PurchasedCourses");
              }}
            >
              Show Purchased Courses
            </Button>
          )}
          {/* {userType == "User" && ( */}
          {(
            <Button
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                router.push("./ShowCourses");
              }}
            >
              Show All Courses
            </Button>
          )}
          <Box>
            <Typography variant="body1" style={{ marginRight: "1rem" }}>
              {session.user?.email}
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => signOut()}>
            LogOut
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>Smart Courses</h2>
      <div>
        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => router.push("./SignUp")}
        >
          signup
        </Button>
        <Button variant="contained" onClick={() => signIn()}>
          signin
        </Button>
      </div>
    </div>
  );
}

export default AppBar;

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions)

//   if (!session) {
//       return {
//           redirect: {
//               destination: '/',
//               permanent: false,
//           },
//       }
//   }

//   if (session && session.user) {
//     if (session.user.name === undefined) {
//       session.user.name = null;
//     }
//     if (session.user.image === undefined) {
//       session.user.image = null;
//     }
//     // You can do the same for other properties if needed
//   }

//   return {
//       props: {
//           session,
//       },
//   }
// }