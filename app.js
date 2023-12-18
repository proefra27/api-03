const express = require('express');
const cors = require('cors');
const app = express();
const puerto = process.env.PORT || 3000;

//Middleware
app.use(cors());
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
let proyectos = [{ id: 1, nombre: 'Proyecto 1', descripcion: 'Descripcion 1', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 2, nombre: 'Proyecto 2', descripcion: 'Descripcion 2', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 3, nombre: 'Proyecto 3', descripcion: 'Descripcion 3', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 4, nombre: 'Proyecto 4', descripcion: 'Descripcion 4', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 5, nombre: 'Proyecto 5', descripcion: 'Descripcion 5', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 6, nombre: 'Proyecto 6', descripcion: 'Descripcion 6', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 7, nombre: 'Proyecto 7', descripcion: 'Descripcion 7', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 8, nombre: 'Proyecto 8', descripcion: 'Descripcion 8', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 9, nombre: 'Proyecto 9', descripcion: 'Descripcion 9', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 10, nombre: 'Proyecto 10', descripcion: 'Descripcion 10', fechaInicio: "10/07/22", fechaFin: "10/08/22" }
];

let tareas = [{ id: 1, nombre: 'Tarea 1', descripcion: 'Descripcion 1', fechaAsignacion: "10/07/22", idProyecto: 1, estatus: "En progreso" },
{ id: 2, nombre: 'Tarea 2', descripcion: 'Descripcion 2', fechaAsignacion: "10/07/22", idProyecto: 1, estatus: "En progreso" },
{ id: 3, nombre: 'Tarea 3', descripcion: 'Descripcion 3', fechaAsignacion: "10/07/22", idProyecto: 2, estatus: "No iniciada" },
{ id: 4, nombre: 'Tarea 4', descripcion: 'Descripcion 4', fechaAsignacion: "10/07/22", idProyecto: 3, estatus: "No iniciada" },
{ id: 5, nombre: 'Tarea 5', descripcion: 'Descripcion 5', fechaAsignacion: "10/07/22", idProyecto: 4, estatus: "Completada" },
{ id: 6, nombre: 'Tarea 6', descripcion: 'Descripcion 6', fechaAsignacion: "10/07/22", idProyecto: 5, estatus: "Completada" },
{ id: 7, nombre: 'Tarea 7', descripcion: 'Descripcion 7', fechaAsignacion: "10/07/22", idProyecto: 6, estatus: "En proceso" },
{ id: 8, nombre: 'Tarea 8', descripcion: 'Descripcion 8', fechaAsignacion: "10/07/22", idProyecto: 7, estatus: "No iniciada" },
{ id: 9, nombre: 'Tarea 9', descripcion: 'Descripcion 9', fechaAsignacion: "10/07/22", idProyecto: 8, estatus: "No iniciada" },
{ id: 10, nombre: 'Tarea 10', descripcion: 'Descripcion 10', fechaAsignacion: "10/07/22", idProyecto: 9, estatus: "En proceso" }
];

app.get('/proyectos/:id/tareas', (req, res) => {
    let id = req.params.id
    //let status = req.params.status
    let status = req.query.status
    console.log(status)
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto == id && tarea.estatus == status);
    console.log(tareasProyecto);
    res.json(tareasProyecto);

} );

app.get('/socios/v1/categorias',(req,res)=>{
    //1.- Verificar si existe categorias
    console.log(req.query);
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
            categorias:[categorias]
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
            categorias:[categoria]
        })
    }else{
        //No se econtro una categoria
        res.status(404).json({
            estado:0,
            mensaje:"Categoria no encontrada",
            categorias:[]
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
                categorias:[categoria]
            })
        }else{
                res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error desconocido",
                categorias:[]
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
                categorias:categorias[posActualizar]
            })
        }else{
            //No se contro la categoria con el id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categorias:[]
            })
        }
    }
    
})

app.delete('/socios/v1/categorias/:id',(req,res)=>{
    const { id } = req.params;
    req.query
    const indiceEliminar = categorias.findIndex(categoria => categoria.id==id);
    if(indiceEliminar!=-1){
        //Borrar la categoria
        categorias.splice(indiceEliminar,1);
        res.status(201).json({
            estado    : 1,
            mensaje   : "Categoria eliminada con exito",
            categorias: []
        })
    }else{
        //Categoria no encontrada
        res.status(404).json({
            estado     : 0,
            menaje     : "Categoria no encontrada",
            categorias : []  
        })
    }
    //Eliminar un recurso del servidor - Eliminar una categoria
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ',puerto);
})

