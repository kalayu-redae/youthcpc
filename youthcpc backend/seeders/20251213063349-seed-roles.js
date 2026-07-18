'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      { id:1, businessId:1, name:'SuperAdmin', code:'superAdmin', description:'SuperAdmin Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:2, businessId:1, name:'Owner', code:'owner', description:'Owner Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:3, businessId:1, name:'Admin', code:'admin', description:'Admin Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:5, businessId:1, name:'Manager', code:'manager', description:'Manager Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:6, businessId:1, name:'Doctor', code:'doctor', description:'Doctor Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:7, businessId:1, name:'Nurse', code:'nurse', description:'Nurse Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:8, businessId:1, name:'Receptionsit', code:'receptionist', description:'Receptionist Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:9, businessId:1, name:'Pharmacist', code:'pharmacist', description:'Pharmacist Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:10, businessId:1, name:'Lab', code:'lab', description:'Lab Role', isActive:true, createdAt:new Date(), updatedAt:new Date() },
      { id:11, businessId:1, name:'Clerk', code:'clerk', description:'Clerk Role', isActive:true, createdAt:new Date(), updatedAt:new Date() }
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('Roles', null, {}); }
};
