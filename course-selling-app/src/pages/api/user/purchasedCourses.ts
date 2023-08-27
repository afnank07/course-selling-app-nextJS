import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  let userName = null;
if(typeof req.headers.userName === 'string'){
    if('newUser' in JSON.parse(req.headers.userName)){
    userName = JSON.parse(req.headers.userName)["newUser"]["username"]
    }else{
    userName = JSON.parse(req.headers.userName)["userDetails"]["username"]
    }
} else{
    userName = req.headers.userName
}
// logic to view purchased courses
const userDetails = await User.findOne({"username":userName}).populate('purchasedCourse');
if (userDetails){
    res.json(userDetails.purchasedCourse);
}else{
    res.status(404).json({message: "User not found"});
}
}