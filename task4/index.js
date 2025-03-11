const express = require("express");
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const missions=[{id:"1",missionName:"Able 1",astronaut:["Khattab","Joseph M","loren Acton"],progress:34},
{id:"2",missionName:"Apollo 1",astronaut:["Khattab","Ali AlQarni","yuri Artyukhin"],progress:100},
{id:"3",missionName:"AirSTAR",astronaut:["Khattab","Jeffrey Ashby","Terrence Wilecrum"],progress:90}
]

//create anew space mission
app.post("/mission",(req,res)=>{
   const data=req.body;
   data.astronaut=JSON.parse(data.astronaut);
    missions.push(data);
    console.log(req.body);
    res.send("mission is create");
})

//retrieve all missions
app.get("/mission",(req,res)=>{
       res.send(missions);
})



//retrieve aspecific missions by ID
app.get("/mission/:id",(req,res)=>{
    const id=req.params.id;
    for(let i=0;i<missions.length;i++){
        if(missions[i].id===id){
            res.send(missions[i]);
        } }
    res.send("the mission not found");
})




//update mission
app.put("/mission",(req,res)=>{
    const data=req.body;
    data.astronaut=JSON.parse(data.astronaut);
    console.log(data);
    for(let i=0;i<missions.length;i++){
        if(missions[i].id===data.id){
            missions[i]=data;
       res.send("the mission is update");
    }}
    res.send("the mission is not found");
})



//cancel mission
app.delete("/mission/:id",(req,res)=>{
    const id=req.params.id;
    for(let i=0;i<missions.length;i++){
        if(missions[i].id===id){
           missions.splice(i,1);
           res.send("the mission is delete")
    }}
    res.send("the mission is not found");
})




app.listen(3000,()=>{
    console.log("the server running on port number 3000");
});