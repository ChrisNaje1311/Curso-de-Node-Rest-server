const {response, request} = require( 'express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res= response) => {

 const { limite = 5, desde = 0 } = req.query;
    const query ={estado:true};
//  const usuarios = await Usuario.find(query)
//  .skip(Number(desde)) 
//  .limit(Number(limite));
//  const total = await  Usuario.countDocuments(query);
 
 
 const [total,usuario] = await  Promise.all([
   Usuario.countDocuments(query),
   Usuario.find(query)
   .skip(Number(desde)) 
   .limit(Number(limite))

   ])


    res.json({

        total,
        usuario
    });
}
const usuariosPost = async(req, res = response) => {
   
    
    
    const {nombre, correo, password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    
    //Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync( password, salt )
    
    await usuario.save();
        // Guardar en DB

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res) => {
    const{ id }= req.params;
    const{_id,password,google,correo , ...resto} = req.body;

    //TODO validar base da datos
    if (password) {
        //Encriptar contrasena
        const salt = bcryptjs.genSaltSync();
    resto.password= bcryptjs.hashSync( password, salt )

    }
    
    const usuario = await Usuario.findByIdAndUpdate(id , resto)
    res.json({

        msg: 'put API - usuariosPut',
        usuario

    });
}

const usuariosPatch = (req, res) => {
    res.json({

        msg: 'patch API - controlador '

    });

}


const usuariosDelete = async(req, res) => {
    const {id} = req.params;    
    
    //Fisicamente lo borramos
    // const usuario =await Usuario.findByIdAndDelete( id );
    
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado:false});
    
    res.json(usuario);

}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete

}
