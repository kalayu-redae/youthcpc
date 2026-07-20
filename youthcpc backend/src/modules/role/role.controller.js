'use strict';


const { Role, User } = require('../../models');

const { Op } = require('sequelize');

const catchAsync = require('../../utils/catchAsync');

const AppError = require('../../utils/appError');



const allowedUpdateFields = [
  'name',
  'description',
  'isActive'
];



// CREATE ROLE

exports.createRole = catchAsync(async (req, res, next) => {


  const {
    name,
    code,
    description
  } = req.body;



  const existingRole = await Role.findOne({

    where: {
      [Op.or]: [
        { name },
        { code }
      ]
    }

  });



  if (existingRole) {

    return next(
      new AppError(
        'Role name or code already exists',
        409
      )
    );

  }



  const role = await Role.create({

    name,

    code,

    description,

    isActive: true

  });



  res.status(201).json({

    status: 1,

    message: 'Role created successfully',

    data: role

  });


});

// GET ALL ROLES
exports.getRoles = catchAsync(async (req, res, next) => {
  const {
    search,
    isActive
  } = req.query;



  const where = {};



  if (search) {

    where[Op.or] = [

      {
        name: {
          [Op.like]: `%${search}%`
        }
      },

      {
        code: {
          [Op.like]: `%${search}%`
        }
      }

    ];

  }



  if (isActive !== undefined) {

    where.isActive =
      isActive === 'true';

  }




  const roles = await Role.findAll({

    where,

    include: [

      {

        model: User,

        as: 'users',

        attributes: ['id']

      }

    ],

    order: [
      ['createdAt', 'DESC']
    ]

  });




  res.status(200).json({

    status: 1,

    results: roles.length,

    data: roles

  });


});

// GET ROLE BY ID
exports.getRole = catchAsync(async (req, res, next) => {

  const role = await Role.findByPk(
    req.params.roleId,
    {

      include: [

        {

          model: User,

          as: 'users',

          attributes: [
            'id',
            'fullName',
            'email'
          ]

        }

      ]

    }

  );



  if (!role) {

    return next(
      new AppError(
        'Role not found',
        404
      )
    );

  }



  res.status(200).json({

    status: 1,

    data: role

  });


});




// UPDATE ROLE

exports.updateRole = catchAsync(async (req, res, next) => {


  const role = await Role.findByPk(
    req.params.roleId
  );



  if (!role) {

    return next(
      new AppError(
        'Role not found',
        404
      )
    );

  }




  if (role.isSystem && req.body.isActive === false) {

    return next(
      new AppError(
        'System roles cannot be deactivated',
        403
      )
    );

  }



  const filteredBody = {};



  allowedUpdateFields.forEach(field => {


    if (req.body[field] !== undefined) {

      filteredBody[field] = req.body[field];

    }


  });



  await role.update(filteredBody);



  res.status(200).json({

    status: 1,

    message: 'Role updated successfully',

    data: role

  });


});




// DELETE ROLE (SOFT DELETE)

exports.deleteRole = catchAsync(async (req, res, next) => {


  const role = await Role.findByPk(
    req.params.roleId
  );



  if (!role) {

    return next(
      new AppError(
        'Role not found',
        404
      )
    );

  }



  if (role.isSystem) {

    return next(
      new AppError(
        'System roles cannot be deleted',
        403
      )
    );

  }



  role.isActive = false;


  await role.save();



  res.status(200).json({

    status: 1,

    message: 'Role deactivated successfully'

  });


});




// ASSIGN USERS TO ROLE

exports.changeUsersToRole = catchAsync(async (req, res, next) => {


  const {
    userIds
  } = req.body;



  if (!Array.isArray(userIds)) {

    return next(
      new AppError(
        'userIds must be an array',
        400
      )
    );

  }



  const role = await Role.findByPk(
    req.params.roleId
  );



  if (!role) {

    return next(
      new AppError(
        'Role not found',
        404
      )
    );

  }



  if (!role.isActive) {

    return next(
      new AppError(
        'Role is inactive',
        400
      )
    );

  }



  await User.update(

    {
      roleId: role.id
    },

    {

      where: {
        id: {
          [Op.in]: userIds
        }
      }

    }

  );



  res.status(200).json({

    status: 1,

    message: 'Users assigned successfully'

  });


});




// USERS BY ROLE

exports.getUsersByRole = catchAsync(async (req, res, next) => {


  const role = await Role.findByPk(

    req.params.roleId,

    {

      include: [

        {

          model: User,

          as: 'users',

          attributes: [
            'id',
            'fullName',
            'email'
          ]

        }

      ]

    }

  );



  if (!role) {

    return next(
      new AppError(
        'Role not found',
        404
      )
    );

  }



  res.status(200).json({

    status: 1,

    role: role.code,

    users: role.users

  });


});




// ROLE SUMMARY

exports.getRoleSummary = catchAsync(async (req, res, next) => {


  const roles = await Role.findAll({

    include: [

      {

        model: User,

        as: 'users',

        attributes: ['id']

      }

    ]

  });



  const activeRoles =
    roles.filter(r => r.isActive).length;



  const inactiveRoles =
    roles.filter(r => !r.isActive).length;




  res.status(200).json({

    status: 1,

    totalRoles: roles.length,

    activeRoles,

    inactiveRoles,

    data: roles.map(role => ({

      id: role.id,

      name: role.name,

      code: role.code,

      users: role.users.length,

      isActive: role.isActive

    }))

  });


});