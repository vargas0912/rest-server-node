const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'First you must validate token'
        });
    }

    const { role, name } = req.user;

    if ( role !=  'Admin'){
        return res.status(401).json({
            msg: `${ name } isn't ADMIN`
        });
    }

    next();
}

const includeRole = ( ...roles ) => {
    return (req = request, res = reponse, next) => {
        
        ///console.log(roles, req.user.role);
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'First you must validate token'
            });
        }

        if ( !roles.includes( req.user.role)) {
            return res.status(401).json({
                msg: `Action requiere this roles:  ${ roles }`
            })
        }


        next();
    }


}


module.exports = {
    isAdminRole,
    includeRole
} 