var Package = require('../models/package');

const fs = require('fs');
const path = require('path');




exports.package_add_get = async function(req, res) {
    res.render('add_package', {package: null});
};

exports.get_package_details = async function(req, res) {
    let package = await Package.findByPk(parseInt(req.params.packageId));
    console.log(req.params.packageId);

    res.render('package_details', {package: package});
};

exports.edit_package_get = async function(req, res) {
    console.log(req.params.packageId);
    packageToEdit = await Package.findByPk(parseInt(req.params.packageId));
    res.render('add_package', {package: packageToEdit });
};

exports.edit_package_post = async function(req, res) {
    packageToEdit = await Package.findByPk(parseInt(req.params.packageId));
    console.log(req.params.packageId);
    console.log(req.body);
    packageToEdit.set(req.body);
    await packageToEdit.save();
    res.redirect('/');
};

exports.package_delete_post = async function(req, res) {
    console.log(req.body.packageId);
    packageToDelete = await Package.findByPk(parseInt(req.body.packageId));
    const pathToImage = packageToDelete.packageCoverPhoto;
    try{
        await packageToDelete.destroy();
        let realPathToImage = path.join(process.cwd(), '/public/'+pathToImage);
        fs.unlinkSync(realPathToImage);
    }catch(err){
        console.error(err);
    }
    res.redirect('/');
};

exports.package_add_post = async function(req, res) {
    let package = Package.build(req.body);
    const newPath = `public/images/uploads/`+ req.file.originalname;
    
    package.set({
        packageCoverPhoto: `images/uploads/`+ req.file.originalname
    });

    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }

   fs.rename(req.file.path, newPath, (err)=>{
        if(err) throw err;
        
   });

    await package.save();
    res.redirect('/');
    
};


exports.get_all_packages = async function(req, res, next) { 
    res.locals.packages = await Package.findAll();
    next();
}
