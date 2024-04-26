require('mongoose');
const peluche = require ('../models/peluches');

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

const editPeluche = async(muneco) => {

    const result = await peluche.findByIdAndUpdate(muneco._id,muneco,{new:true});

    return result;
}

const deletePeluche = async(id) => {

    const result = await peluche.findByIdAndDelete(id);

    return result;
}


module.exports = { addPeluche, getAllPeluches, getPeluche, editPeluche, deletePeluche }
