import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  let newCourse = {
    title : req.body.title,
    description : req.body.description,
    price : req.body.price,
    imageLink : req.body.imageLink,
    published : req.body.published
  }

  const courseObj = new Course(newCourse);
  await courseObj.save();

  res.json({ "message": 'Course created successfully', "courseId": courseObj._id})
}