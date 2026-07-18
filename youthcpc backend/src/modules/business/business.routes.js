const express=require("express")
const app = express();
const router=express.Router();
const businessController=require("./business.controller"); 
const { createMulterMiddleware } = require('../../utils/fileUtils');
const { authenticationJwt, requirePermission } = require('../../utils/authUtils');

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

const upload = createMulterMiddleware(
  'uploads/business',
  'business',
  ['image/jpeg','image/png','application/pdf']
);

// const businessAttachements=upload.fields([
//     { name: 'logo', maxCount: 1 },
//   ])

const businessLogo=upload.single("logo")

// Protect all routes after this middleware
router.use(authenticationJwt);

//router.use(requirePermission('admin',"staff"));

router.route('/')
      .post(businessLogo,businessController.createBusiness)
      // .get(businessController.getAllBusiness)
//    .delete(businessController.deleteAllBusinesses);

router.route('/:businessId')
  .get(businessController.getBusinessById)
  .patch(businessLogo,businessController.updateBusinessById)
  // .delete(businessController.deleteBusinessById);


module.exports=router