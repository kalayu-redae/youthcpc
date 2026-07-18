const express=require("express")
const app = express();
const router=express.Router()

const userController=require("../user/user.controller")
const userPermissionController=require("./userPermission.controller")
const { authenticationJwt,requirePermission,requirePermissionOrSelf} = require('../../utils/authUtils');

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.use(authenticationJwt)

router.route('/:userId')
  .get(requirePermission('user:view'), userPermissionController.getUserPermissions)
  .post(requirePermission('user:update'), userPermissionController.assignPermissionsToUser)
  .delete(requirePermission('user:update'), userPermissionController.removePermissionFromUser)
  
router.patch('/:userId/:permissionId/toggle',
  requirePermission('user:update'), userPermissionController.toggleUserPermission);

router.delete('/:userId/clear',
  requirePermission('user:update'), userPermissionController.clearUserPermissions);

router.get('/:userId/report',
  requirePermission('user:view'), userPermissionController.getUserPermissionSummary);

module.exports = router;
