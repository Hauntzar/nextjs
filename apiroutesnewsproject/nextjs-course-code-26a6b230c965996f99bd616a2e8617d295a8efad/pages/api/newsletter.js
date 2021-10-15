import {MongoClient} from 'mongodb'
import {insertDocument,connectDatabase} from '../../helpers/db-util.js'


async function handler(req, res){
    if (req.method === "POST"){
        const userEmail = req.body.email;
        
        if (!userEmail || !(userEmail.includes('@'))){
            res.status(422).json({ message: 'Please add valid email'})
            return;
        }

        let client

        try {
            client = await connectDatabase();
        }
        catch (error){
            res.status(500).json({message: 'Connecting to the database failed'})
            return
        }

        try {
            await insertDocument(client, 'newsletter', {email: userEmail})
            client.close()
        }
        catch (error){
            res.status(500).json({message: 'Inserting data failed'})
            return
        }
        

        client.close()

        console.log(userEmail)
        res.status(201).json({message: 'signed up!'})
        return;
    }

}

export default handler