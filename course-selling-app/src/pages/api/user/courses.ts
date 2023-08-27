import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  const courseDetails = await Course.find({published: true});
    res.json(courseDetails);
}