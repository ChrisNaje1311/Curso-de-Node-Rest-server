
const { Router }= require('express');
const { check } = require('express-validator');

const validarCampos = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const Role = require('../models/role');
const router = Router()

router.get('/',usuariosGet );

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido),
    validarCampos
],usuariosPut );


router.post('/',[
    check('nombre','El nombre es un campo obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido),
    validarCampos
    ],usuariosPost)

router.delete('/:id',usuariosDelete);


router.patch('/',usuariosPatch );







module.exports = router;


