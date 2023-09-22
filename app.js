const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;

//Middleware
app.use(express.json())

//Arreglo de objeto de categorias
let categorias = [
    {id:1,nombre:"Cocina",descripcion:"Elementos para cocinar"},
    {id:2,nombre:"Limpieza",descripcion:"Elementos para Limpieza"},
    {id:3,nombre:"Electronica",descripcion:"Elementos de Electronica"},
    {id:4,nombre:"Ropa bebe",descripcion:"Elementos para bebe"},
    {id:5,nombre:"Linea blanca",descripcion:"Elementos de linea blanca"},
    {id:6,nombre:"Jardineria",descripcion:"Elementos de Jardineria"},
    {id:7,nombre:"Salud",descripcion:"Elementos para la Salud"},
    {id:8,nombre:"Muebles",descripcion:"Elementos para la Sala y demas"},
    {id:9,nombre:"Lacteos",descripcion:"Elementos para beber"},
    {id:10,nombre:"Licores",descripcion:"Elementos para fiestas"},
    {id:528,nombre:"Licores",descripcion:"Elementos para fiestas"}
];

app.get('/socios/v1/categorias',(req,res)=>{
    //1.- Verificar si existe categorias
    if(categorias.length>0){
        res.status(200).json({
            estado:1,
            mensaje:"Existen categorias",
            categorias: categorias
        })
    }else{
        res.status(404).json({
            estado:0,
            mensaje:"No se encontraron categorias",
            categorias:categorias
        })
    }
})

app.get('/socios/v1/categorias/:id',(req,res)=>{
    //Solo una categoria
    const { id } = req.params;
    //Programacion Funcional
    const categoria = categorias.find(categoria =>categoria.id==id);
    //Si se contro una categoria
    if(categoria){
        res.status(200).json({
            estado:1,
            mensaje:"Categoria encontrada",
            categoria:categoria
        })
    }else{
        //No se econtro una categoria
        res.status(404).json({
            estado:0,
            mensaje:"Categoria no encontrada",
            categoria:{}
        })
    }
})

app.post('/socios/v1/categorias',(req,res)=>{
    const { nombre, descripcion } = req.body;
    const id = Math.round(Math.random()*1000);
    if(nombre==undefined || descripcion==undefined){
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }else{
        const categoria = {
            id:id,
            nombre:nombre,
            descripcion:descripcion};
        
        const logitudInicial = categorias.length;
        
        categorias.push(categoria)
        
        if(categorias.length>logitudInicial){
            res.status(201).json({
                estado:1,
                mensaje:"Categoria creada",
                categoria:categoria
            })
        }else{
                res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error desconocido"
            })
        }
    }
})

app.put('/socios/v1/categorias/:id',(req,res)=>{
    //id viene ? = params
    //nombre y descripcion ? = body
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if( nombre==undefined || descripcion==undefined ){
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    } else{
        const posActualizar = categorias.findIndex(categoria =>categoria.id==id)
        if(posActualizar!=-1){
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            categorias[posActualizar].nombre=nombre;
            categorias[posActualizar].descripcion=descripcion;
            res.status(200).json({
                estado:1,
                mensaje:"Categoria actualizada",
                categoria:categorias[posActualizar]
            })
        }else{
            //No se contro la categoria con el id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada"
            })
        }
    }
    
})

app.delete('/socios/v1/categorias/:id',(req,res)=>{
    const { id } = req.params;
    const indiceEliminar = categorias.findIndex(categoria => categoria.id==id);
    if(indiceEliminar!=-1){
        //Borrar la categoria
        categorias.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Categoria eliminada con exito"
        })
    }else{
        //Categoria no encontrada
        res.status(404).json({
            estado:0,
            menaje:"Categoria no encontrada"   
        })
    }
    //Eliminar un recurso del servidor - Eliminar una categoria
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ',puerto);
})

