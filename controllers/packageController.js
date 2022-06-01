var Package = require('../models/package');
const fs = require('fs');
const path = require('path');
const e = require('express');
const { LanguageDetector } = require('i18next-http-middleware');




exports.package_add_get = async function(req, res) {
    res.render('add_package', {package: null});
};

exports.get_package_details = async function(req, res) {
    let package = await Package.findByPk(parseInt(req.params.packageId));

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
    const pathToImage2 = packageToDelete.packageCoverPhoto2 ? path.join(process.cwd(), '/public/'+packageToDelete.packageCoverPhoto2) : null;
    const pathToImage3 = packageToDelete.packageCoverPhoto3 ? path.join(process.cwd(), '/public/'+packageToDelete.packageCoverPhoto3) : null;
    try{
        await packageToDelete.destroy();
        let realPathToImage = path.join(process.cwd(), '/public/'+pathToImage);
        fs.unlinkSync(realPathToImage);
        if(pathToImage2) fs.unlinkSync(pathToImage2);
        if(pathToImage3) fs.unlinkSync(pathToImage3);
    }catch(err){
        console.error(err);
    }
    res.redirect('/');
};

exports.package_add_post = async function(req, res) {
    let package = Package.build(req.body);

    for (let i=0; i<req.files.length; i++){
        const newPath = `public/images/uploads/`+ Date.now() + req.files[i].originalname;
        if (i==0) package.set({packageCoverPhoto: `images/uploads/`+ Date.now() + req.files[i].originalname});
        if (i==1) package.set({packageCoverPhoto2: `images/uploads/`+ Date.now() + req.files[i].originalname});
        if (i==2) package.set({packageCoverPhoto3: `images/uploads/`+ Date.now() + req.files[i].originalname});

        if (!req.files) {
            res.status(401).json({error: 'Please provide an image'});
        }

        fs.rename(req.files[i].path, newPath, (err)=>{
            if(err) throw err;
            
       });
    }

    package.save();
 
    res.redirect('/');
    
};


exports.get_all_packages = async function(req, res, next) { 
    try{
    res.locals.packages = await Package.findAll();
    next();
    } catch(err){
        console.log(err);
    }
}
