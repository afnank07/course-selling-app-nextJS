import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  let course = await Course.find({});
  res.json(course);
}