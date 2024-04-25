require('mongoose');
const peluche = require ('../estructura/models/peluches');

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

// categorias

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