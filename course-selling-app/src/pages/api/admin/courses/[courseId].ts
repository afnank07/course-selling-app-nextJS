import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Admin, Course } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  
  const {courseId} = req.query;
  let course = await Course.findByIdAndUpdate(courseId, req.body, { new : true });
  if (course){
    res.json({ message: 'Course updated successfully' });
  } else{
    res.status(404).json({ message: 'Course not found' });
  }
}