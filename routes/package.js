var express = require('express');
const multer = require('multer');
const upload = multer({dest: 'public/images/uploads'});


var router = express.Router();
var packageController = require('../controllers/packageController')

router.all('*', (req,res,next) =>{
    res.locals.user = req.user;
    next();
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index');
});

router.get('/add_new_package', packageController.package_add_get);
router.post('/add_new_package', upload.single('packageCoverPhoto'), packageController.package_add_post);

router.get('/:packageId', packageController.get_package_details);

router.get('/edit/:packageId', packageController.edit_package_get);
router.post('/edit/:packageId', packageController.edit_package_post);
router.post('/delete/', packageController.package_delete_post);

module.exports = router;