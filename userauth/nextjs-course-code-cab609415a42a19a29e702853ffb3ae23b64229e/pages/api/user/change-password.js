import {getSession} from 'next-auth/client'
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';


async function handler(req, res) {
    if (req.method !== 'PATCH'){
        return;
    }
    
    const session = await getSession({req: req})
    // the above and below is the code that protects the api route from non authenticated users
    if (!session) {
        res.status(401).json({message: 'Not authenticated!'})
        return
    }

    const userEmail = session.user.email // this is returned in the [...nextauth].js file
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const client = await connectToDatabase()

    const usersCollection = client.db().collection('users')
    const user = await usersCollection.findOne({email: userEmail})

    if (!user) {
        client.close()
        res.status(404).json({message: 'user not found'})
        return
    }

    const currentPassword = user.password;
    
    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword)
    if (!passwordsAreEqual){
        client.close()
        res.status(403).json({message: 'You are authenticated but not authorized for this operation'})
        return
    }

    const hashedPassword = await hashPassword(newPassword, 15)

    usersCollection.updateOne({email: userEmail},
        {$set: {password: hashedPassword} }
    )

    client.close()
    res.status(200).json({message: 'password updated'})
}

export default handler