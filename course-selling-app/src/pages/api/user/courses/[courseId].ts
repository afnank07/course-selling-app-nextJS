import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Course } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
import mongoose from 'mongoose';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  
  const {courseId} = req.query;
  const courseDetails = await Course.findById(courseId);
  
  if (courseDetails){
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
    const userDetails = await User.findOne({"username":userName});

    if (userDetails){
      userDetails.purchasedCourse.push(courseDetails._id as mongoose.Types.ObjectId);
      await userDetails.save();
      res.json({ message: 'Course purchased successfully' })
    }else{
      res.status(403).json({ message: 'User not found' })
    }
  } else {
      res.status(404).json({ message: 'Course not found' })
    }
}