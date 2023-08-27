import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Admin } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  
  const {username} = req.query;
  const userDetails = await User.findOne({username});
  const adminDetails = await Admin.findOne({username});

  // res.end(`User: ${user}, Admin: ${admin}`)

  if (userDetails){
    res.json({ role: 'User' })
  } else if(adminDetails){
    res.json({ role: 'Admin' })
  }

  res.status(403).json({ message: 'User not found' })
}