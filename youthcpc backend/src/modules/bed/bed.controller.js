const { Bed, Room } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.createBed = catchAsync(async(req,res,next)=>{

const {room_id,bed_number} = req.body;

const room = await Room.findByPk(room_id);

if(!room){
return next(new AppError("Room not found",404));
}

const bed = await Bed.create({
room_id,
bed_number
});

res.status(201).json({
error:false,
status:1,
message:"Bed created successfully",
data:bed
});

});


exports.getAllBeds = catchAsync(async(req,res)=>{

const beds = await Bed.findAll({
include:[Room]
});

res.status(200).json({
error:false,
status:1,
data:beds
});

});


exports.getBedById = catchAsync(async(req,res,next)=>{

const bed = await Bed.findByPk(req.params.id,{
include:[Room]
});

if(!bed){
return next(new AppError("Bed not found",404));
}

res.status(200).json({
error:false,
status:1,
data:bed
});

});


exports.updateBed = catchAsync(async(req,res,next)=>{

const bed = await Bed.findByPk(req.params.id);

if(!bed){
return next(new AppError("Bed not found",404));
}

await bed.update(req.body);

res.status(200).json({
error:false,
status:1,
message:"Bed updated",
data:bed
});

});


exports.deleteBed = catchAsync(async(req,res,next)=>{

const bed = await Bed.findByPk(req.params.id);

if(!bed){
return next(new AppError("Bed not found",404));
}

await bed.destroy();

res.status(200).json({
error:false,
status:1,
message:"Bed deleted"
});

});