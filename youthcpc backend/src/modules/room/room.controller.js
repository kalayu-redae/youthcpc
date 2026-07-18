const { Room, Ward } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


exports.createRoom = catchAsync(async(req,res,next)=>{

const {ward_id,room_number,type,capacity} = req.body;

const ward = await Ward.findByPk(ward_id);

if(!ward){
return next(new AppError("Ward not found",404));
}

const room = await Room.create({
ward_id,
room_number,
type,
capacity
});

res.status(201).json({
error:false,
status:1,
message:"Room created successfully",
data:room
});

});


exports.getAllRooms = catchAsync(async(req,res)=>{

const rooms = await Room.findAll({
include:[Ward]
});

res.status(200).json({
error:false,
status:1,
data:rooms
});

});


exports.getRoomById = catchAsync(async(req,res,next)=>{

const room = await Room.findByPk(req.params.id,{
include:[Ward]
});

if(!room){
return next(new AppError("Room not found",404));
}

res.status(200).json({
error:false,
status:1,
data:room
});

});


exports.updateRoom = catchAsync(async(req,res,next)=>{

const room = await Room.findByPk(req.params.id);

if(!room){
return next(new AppError("Room not found",404));
}

await room.update(req.body);

res.status(200).json({
error:false,
status:1,
message:"Room updated",
data:room
});

});


exports.deleteRoom = catchAsync(async(req,res,next)=>{

const room = await Room.findByPk(req.params.id);

if(!room){
return next(new AppError("Room not found",404));
}

await room.destroy();

res.status(200).json({
error:false,
status:1,
message:"Room deleted"
});

});