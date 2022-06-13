
const validateFile = (req, res, next) =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded. Middleware'  });
    }
    
    if (!req.files) {
        return res.status(400).json({ msg: 'No files were uploaded. Middleware' });
        
    }

    next();
}

module.exports = {
    validateFile
}