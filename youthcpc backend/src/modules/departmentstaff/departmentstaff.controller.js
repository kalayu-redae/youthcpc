const { DepartmentStaff, Department, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.assignStaff = catchAsync(async(req,res,next)=>{

const {department_id,user_id,status} = req.body;

const department = await Department.findByPk(department_id);
if(!department){
return next(new AppError("Department not found",404));
}

const user = await User.findByPk(user_id);
if(!user){
return next(new AppError("User not found",404));
}

const staff = await DepartmentStaff.create({
department_id,
user_id,
status
});

res.status(201).json({
status:1,
message:"Staff assigned to department",
data:staff
});

});


exports.getDepartmentStaff = catchAsync(async(req,res)=>{

const staff = await DepartmentStaff.findAll({
include:[
{model:Department,attributes:["id","name"]},
{model:User,attributes:["id","email"]}
]
});

res.status(200).json({
status:1,
data:staff
});

});


exports.removeStaff = catchAsync(async(req,res,next)=>{

const staff = await DepartmentStaff.findByPk(req.params.id);

if(!staff){
return next(new AppError("Record not found",404));
}

await staff.destroy();

res.status(200).json({
status:1,
message:"Staff removed from department successfully!"
});

});