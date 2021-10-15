import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://admin:123Password@cluster0.tpcfm.mongodb.net/userauth?retryWrites=true&w=majority')
    
    return client
}