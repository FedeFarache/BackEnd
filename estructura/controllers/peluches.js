require('mongoose');
const peluche = require ('../models/peluches');
const Usr = require ('../models/user');

const addPeluche = async (animal,color,accesorio) => {
    let existPeluche = await muneco.findOne({ animal : animal, color : color, accesorio : accesorio });
    console.log(existUser);
    if (!existPeluche){
        
        const peluche = new peluche(
            {
                animal : animal,
                color : color,
                accesorio : accesorio,
                creador : creador
            });
            
        let muneco = await peluche.save(); 

        console.log("peluche creado exitosamente");

        await Usr.findByIdAndUpdate(creadorId, {
            $push: { arregloIdPeluches: peluche._id }
          });
        console.log(muneco);
        return { muneco }; 
    }else{
        console.log("peluche existente");
        console.log(existPeluche);
        return  { existPeluche };
    }
}

const getAllPeluches = async (limit,offset) => {

    const munecos = await peluche.find({}).limit(limit).skip(offset);

    return munecos;
}

const getPeluche = async(id) => {

    const muneco = await peluche.findById(id);


    return muneco;
}

// Si al usuario le gusta un peluche existente, lo guarda en su array

const savePelucheId = async (userId, pelucheId) => {
    try {
        const muneco = await peluche.findById(pelucheId);
        // Actualiza el usuario para guardar el ID del peluche en su array
        await Usr.findByIdAndUpdate(userId, {
            $push: { arregloIdPeluches: pelucheId }
        });

        res.status(201).send("Peluche guardado en el array del usuario correctamente"); // 201
    } catch (error) {
        res.status(409).send("Error al guardar el peluche en el array del usuario:"); // 409
        throw error;
    }
}

const editPeluche = async(muneco) => { 

    const result = await peluche.findByIdAndUpdate(muneco._id,muneco,{new:true});

    return result;
}

const deletePeluche = async (id) => {
    try {
        // Eliminar el peluche
        const result = await peluche.findByIdAndDelete(id);

        // Si se eliminó el peluche, actualiza el usuario
        if (result) {
            // Encuentra el usuario que tiene el ID del peluche y actualiza su arreglo (lo borra de todos los usuarios)
            await User.updateMany({ arregloIdPeluches: id }, { $pull: { arregloIdPeluches: id } });

            return result;
        } else {
            throw new Error(res.status(409).send("Peluche no encontrado")); // 409
        }
    } catch (error) {
        throw error;
    }
}


module.exports = { addPeluche, getAllPeluches, getPeluche, editPeluche, savePelucheId, deletePeluche }
