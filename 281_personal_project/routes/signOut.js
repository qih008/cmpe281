/*jslint node: true */
exports.signOut = function (req, res) {
    "use strict";
    
    req.session.destroy();
    
    res.status(200).json({ msg: "success" });
    
};