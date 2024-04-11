import express, { json, urlencoded } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';

// still cant use the process.env for reading the env var.
const uri = "mongodb+srv://tan:2dRiJjLXrfn9GZHq@tancluster.eutbq9e.mongodb.net/menstruEaseDB?retryWrites=true&w=majority&appName=TanCluster"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const app = express()
const port = 3001

// deploying some of the most commonly used middlewares.
app.use(json()) // for parsing application/json
app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({ origin: ["http://localhost:3000"] }))

app.post('/signup', async (req, res) => {

    // here we gon make a response obj thats mutated by either try or catch clause and returned by finally.
    let response

    try {
        // trying to make a connection with the remotely hosted mongodb using atlas service.
        const connection = await client.connect()
        // retreiving the db first
        const db = client.db("menstruEaseDB")
        // then the corresponding collection.
        const usersColl = db.collection("users")

        // here we gon enter the formdata.
        const res = await usersColl.insertOne(req.body)

        if (res.acknowledged) {
            console.log(res)
            console.log("user added.");
        }

        response = { message: "user added ✅" }

        // @ todo: fix this. res.json is not f().
        return res.json(response) // it might be because of this.

    } catch (error) {
        console.log(error)
        response = { message: "couldn't add user ❌" }
        return res.json(response)
    } finally {
        // connection closed to safely pull out.
        client.close()
    }
})

app.post("/signin", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.post("/track", async (req, res) => {
    try {

    } catch (error) {

    }
})

app.get("profile", async (req, res) => {
    try {

    } catch (error) {

    }
})

app.listen(port, () => {
    console.log(`REST api served on ${port}...`)
})