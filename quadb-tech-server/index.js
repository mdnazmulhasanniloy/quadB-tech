const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 2000;


app.use(cors());
app.use(express.json());



//db connect 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z6kqfy9.mongodb.net/?retryWrites=true&w=majority` 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// jwt function

const verifyJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unAuthorize access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}  
const run = async () => {
    try {

        //db table 
        const userCollection = client.db(`${process.env.DB_USER}`).collection('user');
        const bookingCollection = client.db(`${process.env.DB_USER}`).collection('booking'); 
 


        // jwt api
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
                return res.send({ accessToken: token });
            }
            return res.status(403).send({ accessToken: '' })

        });
        
        //create user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            console.log(user, result)
            res.send(result);
        });


        // find users
        app.get('/allUser', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const userQuery = {}
            const result = await userCollection.find(userQuery).toArray();
            res.send(result)
        });


        


        // delete user 

        app.delete('/user/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id;
            const userQuery = {
                _id: ObjectId(id)
            }

            const result = await userCollection.deleteOne(userQuery);
            res.send(result);
        })

          // check admin user 
          app.get('/user/admins/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query)
            res.send({ isAdmin: user?.role === 'Admin' })

        });





        // add my booking
        app.post('/booking', async (req, res) => {
            const user = req.body;
            const result = await bookingCollection.insertOne(user)
            res.send(result);
        });

         //get Booking using email
         app.get('/MyBooking/:email', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Buyers') {
                return res.status(403).send({ message: 'forbidden access this feature only access a Buyers' })
            }


            const email = req.params.email;
            const myBookingQuery = {
                email: email,
            }
            const result = await bookingCollection.find(myBookingQuery).sort('date', -1).toArray();
            res.send(result)
        });

        //delete my booked item

        app.delete('/myBooking/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await userCollection.findOne(query);
            if (user?.role !== 'Buyers') {
                return res.status(403).send({ message: 'forbidden access' })
            }


            const id = req.params.id;
            console.log(id)
            const bookingQuery = {
                _id: new ObjectId(id)
            }
            const result = await bookingCollection.deleteOne(bookingQuery);
            res.send(result);
        })




    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('simple quadb-tech server is running');
});



app.listen(port, () => {
    console.log(`simple quadb-tech server running on prot ${port}`);
})