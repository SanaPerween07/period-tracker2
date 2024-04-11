import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { SignUpModel, SingInModel, TrackModel } from './models.mjs';
import { connect, connection } from "mongoose"

// run server.mjs using this cmd. assuming that you are in the period-tracker2 dir. use "node --env-file=.env backend/server.mjs"
const uri = process.env.MONGO_URL

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
        const connection = await connect(uri)

        const signupUser = SignUpModel({
            ...req.body
        })

        const res = await signupUser.save()

        if (res.acknowledged) {
            console.log(res)
            console.log("user added.");
        }

        response = { message: "user added ✅" }

        // @ todo: fix this. res.json is not f().
        return res.status(200).json(response) // it might be because of this.

    } catch (error) {
        console.log(error)
        response = { message: "couldn't add user ❌" }
        return res.status(500).json(response)
    } finally {
        await connection.close() // first the connection is closed and then the response is returned.
    }
})

app.post("/signin", async (req, res) => {
    let response

    try {
        const singinUser = SingInModel({
            ...req.body
        })

        const res = await singinUser.save()

        if (res.acknowledged) {
            console.log(res)
            console.log("user signed in ✅.");
        }

        response = { message: "user signed in ✅." }

        return res.status(200).json(response) 
    } catch (error) {
        console.log(error)
        response = { message: "couldn't add user ❌" }
        return res.status(500).json(response)
    } finally {
        await connection.close() // first the connection is closed and then the response is returned.
    }
})

app.post("/track", async (req, res) => {
    let response

    try {
        const trackedObj = TrackModel({
            ...req.body
        })

        const res = await trackedObj.save()

        if (res.acknowledged) {
            console.log(res)
            console.log("user's period info recvd ✅.");
        }

        response = { message: "user's period info recvd ✅." }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        response = { message: "couldn't track user's period info  ❌" }
        return res.status(500).json(response)
    } finally {
        await connection.close() // first the connection is closed and then the response is returned.
    }
})

app.listen(port, () => {
    console.log(`REST api served on ${port}...`)
})