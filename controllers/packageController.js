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
    packageToEdit.set(req.body);
    if(req.body.pricePerPerson === '') packageToEdit.set({pricePerPerson: null});
    await packageToEdit.save();
    res.redirect('/');
};

exports.package_delete_post = async function(req, res) {
    console.log(req.body.packageId);
    packageToDelete = await Package.findByPk(parseInt(req.body.packageId));
   
    try{
        for (let i=0; i< packageToDelete.packagePhotos.length; i++){
            fs.unlink( path.join(process.cwd(), '/public/'+packageToDelete.packagePhotos[i]),(err)=>{
                if(err) console.log(err);
            } );
        }
        await packageToDelete.destroy();
    }catch(err){
        console.error(err);
    }
    res.redirect('/');
};

exports.package_add_post = async function(req, res) {
    let package = Package.build(req.body);
    if(req.body.pricePerPerson === '') package.set({pricePerPerson: null});
    
    
    let photos = [];
    for (let i=0; i<req.files.length; i++){
        
        const newPath = `public/images/uploads/`+ Date.now() + req.files[i].originalname;
        photos.push( `images/uploads/`+ Date.now() + req.files[i].originalname);
       
        if (!req.files) {
            res.status(401).json({error: 'Please provide an image'});
        }

        fs.rename(req.files[i].path, newPath, (err)=>{
            if(err) throw err;
            
       });
    }
    package.set({packagePhotos: photos});

    
    package.save().then( (result)=>{
        res.redirect('/');
    }, (result) => {
        console.log(result);
    });
 
};


exports.get_all_packages = async function(req, res, next) { 
    try{
    res.locals.packages = await Package.findAll();
    next();
    } catch(err){
        console.log(err);
    }
}
