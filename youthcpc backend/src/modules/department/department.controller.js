const { Department, Business, Branch, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op } = require('sequelize');


exports.createDepartment = catchAsync(async(req,res,next)=>{

const { name,status} = req.body;
const businessId =req.user.businessId;
const headUserId = req.user.id;
console.log('business ID:',businessId,headUserId ) 
if( !name){
return next(new AppError(" Department name required",400));
}
if(!businessId){
return next(new AppError("Business not found",404));
}
const department = await Department.create({
businessId,
name,
headUserId,
status
});

res.status(201).json({
status:1,
message:"Department created successfully",
data:department
});

});


exports.getAllDepartments = catchAsync(async(req,res)=>{

const {search,page=1,limit=20} = req.query;

const where={};

if(search){
where.name={ [Op.like]:`%${search}%` };
}

const offset=(page-1)*limit;

const {rows,count}=await Department.findAndCountAll({
where,
limit:Number(limit),
offset,
include:[
{model:Business,attributes:["id","name"]},
{model:Branch,attributes:["id","name"]}
]
});

res.status(200).json({
status:1,
result:count,
data:rows
});

});


exports.getDepartmentById = catchAsync(async(req,res,next)=>{

const department=await Department.findByPk(req.params.id,{
include:[
{model:Business},
{model:Branch}
]
});

if(!department){
return next(new AppError("Department not found",404));
}

res.status(200).json({
status:1,
data:department
});

});


exports.updateDepartment = catchAsync(async(req,res,next)=>{

const department=await Department.findByPk(req.params.id);

if(!department){
return next(new AppError("Department not found",404));
}

await department.update(req.body);

res.status(200).json({
status:1,
message:"Department updated successfully!",
data:department
});

});


exports.deleteDepartment = catchAsync(async(req,res,next)=>{

const department=await Department.findByPk(req.params.id);

if(!department){
return next(new AppError("Department not found",404));
}

await department.destroy();

res.status(200).json({
status:1,
message:"Department deleted"
});

});