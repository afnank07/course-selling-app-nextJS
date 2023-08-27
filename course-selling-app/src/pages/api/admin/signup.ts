import type { NextApiRequest, NextApiResponse } from 'next';
import { Admin } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  let adminDetails = {
    username : req.body.username,
    password : req.body.password,
    role: "admin"
  }

  const admin = await Admin.findOne({username : req.body.username});
  if (admin){
    res.status(403).json({ message: 'Admin already exists' });
  } else{
    const newAdmin = new Admin(adminDetails)
    newAdmin.save();
    res.json({ 
      message: 'Admin created successfully'
    });
  }
}