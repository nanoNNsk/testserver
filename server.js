const express = require("express");
const app = express();
const PORT = 8000;

//make express.json able to parser json body
app.use(express.json());

//customer database
const customers = [
    {id:2535, name:"sibthinon kruesri", birthdate:"2003-12-02"},
    {id:2536, name:"borana serman", birthdate:"1990-02-08"},
];

//check respond
app.get("/", (req,res)=>{
    res.send("Hi World");
});

app.get("/customers", (req,res)=>{
    res.send(customers);
})

app.get('/customers/:id', (req,res)=>{
    //go to part with id
    const id = req.params.id;
    const mycustomer = customers.find(item=>item.id==id);

    //send customer that equal id
    res.send(mycustomer);
})

app.listen(PORT, ()=>{
    //tell port
    console.log(`Server started on port ${PORT}`);
});

app.post("/customers", (req,res)=>{
    //post customer detail
    const newcustomer = req.body;
    console.log(newcustomer);

    //push to customer
    customers.push(newcustomer);

    //tell success
    res.send({status:"success", message:"customer create"});
});