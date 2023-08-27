import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/lib/db';
import { ensureDbConnected } from '@/lib/dbConnect';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user){
      res.status(403).json({ message: 'User already exists' });
    } else{
      const newUser = {username, password};
      const userObj = new User(newUser);
      await userObj.save();
      res.json({"message":"User has been created"});
    }
}