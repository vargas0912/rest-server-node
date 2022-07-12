const express = require("express");
const fs = require("fs"); //Filesystem
const router = express.Router();

const PATH_ROUTES = __dirname; //Ruta de la aplicacion

/**
 * Retorna solo el nombre del archivo
 */
const removeExtension = (fileName) => {    
    return fileName.split('.').shift();
}


/**
 * Recorre todos los archivos (rutas) del directorio
 */
const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
    const fileName = removeExtension(file); // 'users', 'products', etc    

    if (fileName !== 'index'){
        //Se configura el nombre del router y se asocia con la ruta del archivo
        router.use(`/${fileName}`, require(`./${file}`));
    }
});

//console.log(a); //Devuelve un arreglo con los archivos del directorio

module.exports = router