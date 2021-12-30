const express =require('express')
const { MongoClient } = require('mongodb');
const objectId=require('mongodb').ObjectId;
require('dotenv').config()
const cors=require('cors')
const app=express();
const port=process.env.PORT||5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rh3cx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res)=>{

    res.send('get the response')
})

async function run(){
    try{
    await client.connect();
    const database=client.db("petcare");
    const  productCollection=database.collection('products');
    const  doctorCollection=database.collection('doctors');
    const  bookappointmentCollection=database.collection('bookings');
  //Post Api

  app.post('/products',async(req,res)=>{
    const product=req.body
    console.log("hit the post api",product)

    const result=await productCollection.insertOne(product)
    console.log(result)
    res.json(result)
 
  })


  app.get('/products',async(req,res)=>{
    const cursor= productCollection.find({})
    const products=await cursor.toArray()
    res.send(products)
 
  })


app.get('/singleproduct/:id',async(req,res)=>{
const id=req.params.id
const query={_id:objectId(id)}
const product=await productCollection.findOne(query)
res.json(product)


})



//add a doctor


app.post('/doctors',async(req,res)=>{
  const doctor=req.body
  console.log("hit the post api",doctor)

  const result=await doctorCollection.insertOne(doctor)
  console.log(result)
  res.json(result)

})

app.get('/doctors',async(req,res)=>{
  const cursor= doctorCollection.find({})
  const doctors=await cursor.toArray()
  res.send(doctors)

})



app.post('/bookings',async(req,res)=>{
  const bookings=req.body
  console.log("hit the post api",bookings)

  const result=await bookappointmentCollection.insertOne(bookings)
  console.log(result)
  res.json(result)

})




    }
    finally{
       // await client.close();
    }
    }
    
    run().catch(console.dir);
    app.listen(port,()=>{
        console.log('listen to the port',port)
    })