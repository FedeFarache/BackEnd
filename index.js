const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const http = require("http").createServer (app);
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URL
const PORT = process.env.PORT || 8050;


const UsrController = require('./estructura/controllers/users');
const PelucheController = require('./estructura/controllers/peluches');
const AuthController = require('./estructura/controllers/auth');
const Middleware = require('./estructura/middleware/auth-middleware');
//const MailController = require('./estructura/controllers/email');

  app.use(express.json());
  app.use(cors());

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }); 

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      //await client.close();
    }
}
run().catch(console.dir);


/* llamada individual
app.get ("/remeras/:id", (req,res) =>{
    let { id = 0} = -
})*/

app.post("/",(req,res) => {
    res.send("llamada post.");
})

//Get de todos los usuarios
app.get("/users",Middleware.verify,async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente mas tarde.")
  }

});

// Get Info de un usuario

app.get("/users/:id",async (req,res) =>{

    let userId =  req.params.id;

    try{

      user = await UsrController.getUser(userId);

      res.status(200).json(user);

    }catch(error){
      res.status(500).send("Error");
    }

});

// Crear un nuevo usuario

app.post("/users",async (req,res) =>{
    
    let email = req.body.email;
    let name = req.body.name;
    let lastname = req.body.lastname;
    let password = req.body.password;
    try{
      const result = await UsrController.addUser(name,lastname,email,password);
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el usuario."); //500
    }  
    
});

// Login

app.post("/login", async (req,res) =>{
  let email =  req.body.email;
  let password =  req.body.password;
  try{
    const datos = await AuthController.login(email,password);
    res.status(200).json(datos);

}catch(error){
    res.status(500).send("Error. Intente mas tarde.")
}
 
  console.log (datos);
  res.json({'respuesta' : 'Sesión iniciada'})

})

// Modificar un usuario

app.put("/users/:id",async (req,res) =>{

    const user = { _id: req.params.id,name : req.body.name, lastname : req.body.lastname,email : req.body.email, password : req.body.password};
    try{
      
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error");
    } 

});

// Eliminar un usuario
app.delete("/users/:id", async(req,res) =>{

    try{

      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  

    }catch(error){
      res.status(500).send("Error")
    }
});

app.post("/peluches",async (req,res) =>{
    
  let animal = req.body.animal;
  let color = req.body.color;
  let accesorio = req.body.accesorio;
  try{
    const result = await pelucheController.addPeluche(animal,color,accesorio);
    if(result){
      res.status(201).send("peluche creado correctamente"); // 201
    }else{
      res.status(409).send("El peluche ya existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear el peluche."); //500
  }  
  
});

app.get ("/categoria", (req,res) => {
  let resultado = { '1':'Animal','2':'Color','3':'Accesorios'}
  res.json ({'categorias': resultado})
})

// animales

app.get ("/categoria/animal",(req,res) => {
  let resultado = {'1': 'Perro',
                   '2': 'Conejo',
                   '3': 'Oso',
                   '4': 'Mapache',
                   '5': 'Gato'
                  }
  res.json ({'animal': resultado})
})

// color

app.get ("/categoria/color",(req,res) => {
  let resultado = {'1': 'Rosa',
                   '2': 'Amarillo',
                   '3': 'Verde',
                  }
  res.json ({'color': resultado})
})

// accesorio

app.get ("//categoria/accesorio",(req,res) => {
  let resultado = {'1': 'Camiseta y pelota de futbol',
                   '2': 'Guitarra eléctrica',
                   '3': 'Notebook',
                  }
  res.json ({'accesorio': resultado})
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

