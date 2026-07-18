hms-backend
│
├── src
│   │
│   ├── config
│   │   ├── database.js
│   │   ├── env.js
│   │   └── swagger.js
│   │
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── permission.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── utils
│   │   ├── appError.js
│   │   ├── catchAsync.js
│   │   ├── apiFeatures.js
│   │   ├── responseHandler.js
│   │   ├── fileUpload.js
│   │   └── logger.js
│   │
│   ├── models
│   │   ├── index.js
│   │   └── (sequelize models auto-loaded)
│   │
│   ├── modules
│   │
│   │   ├── auth
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │
│   │   ├── users
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.service.js
│   │   │   └── user.validation.js
│   │
│   │   ├── roles
│   │   │   ├── role.model.js
│   │   │   ├── role.controller.js
│   │   │   ├── role.routes.js
│   │   │   └── role.service.js
│   │
│   │   ├── permissions
│   │   │   ├── permission.model.js
│   │   │   ├── permission.controller.js
│   │   │   ├── permission.routes.js
│   │   │   └── permission.service.js
│   │
│   │   ├── auditLogs
│   │   │   ├── auditLog.model.js
│   │   │   ├── auditLog.controller.js
│   │   │   └── auditLog.routes.js
│   │
│   │   ├── hospital
│   │   │   ├── hospital.model.js
│   │   │   ├── hospital.controller.js
│   │   │   ├── hospital.routes.js
│   │   │   └── hospital.service.js
│   │
│   │   ├── branches
│   │   │   ├── branch.model.js
│   │   │   ├── branch.controller.js
│   │   │   ├── branch.routes.js
│   │   │   └── branch.service.js
│   │
│   │   ├── departments
│   │   │   ├── department.model.js
│   │   │   ├── departmentStaff.model.js
│   │   │   ├── department.controller.js
│   │   │   └── department.routes.js
│   │
│   │   ├── wards
│   │   │   ├── ward.model.js
│   │   │   ├── ward.controller.js
│   │   │   └── ward.routes.js
│   │
│   │   ├── rooms
│   │   │   ├── room.model.js
│   │   │   ├── room.controller.js
│   │   │   └── room.routes.js
│   │
│   │   ├── beds
│   │   │   ├── bed.model.js
│   │   │   ├── bedAssignment.model.js
│   │   │   ├── bed.controller.js
│   │   │   └── bed.routes.js
│   │
│   │   ├── patients
│   │   │   ├── patient.model.js
│   │   │   ├── patientContact.model.js
│   │   │   ├── patientInsurance.model.js
│   │   │   ├── patient.controller.js
│   │   │   └── patient.routes.js
│   │
│   │   ├── triage
│   │   │   ├── triage.model.js
│   │   │   ├── vitalSign.model.js
│   │   │   ├── triage.controller.js
│   │   │   └── triage.routes.js
│   │
│   │   ├── consultations
│   │   │   ├── consultation.model.js
│   │   │   ├── diagnosis.model.js
│   │   │   ├── prescription.model.js
│   │   │   ├── prescriptionItem.model.js
│   │   │   ├── followup.model.js
│   │   │   ├── consultation.controller.js
│   │   │   └── consultation.routes.js
│   │
│   │   ├── laboratory
│   │   │   ├── labTest.model.js
│   │   │   ├── labOrder.model.js
│   │   │   ├── labOrderItem.model.js
│   │   │   ├── labResult.model.js
│   │   │   ├── lab.controller.js
│   │   │   └── lab.routes.js
│   │
│   │   ├── pharmacy
│   │   │   ├── medicine.model.js
│   │   │   ├── medicineCategory.model.js
│   │   │   ├── medicineBatch.model.js
│   │   │   ├── stockTransaction.model.js
│   │   │   ├── dispense.model.js
│   │   │   ├── dispenseItem.model.js
│   │   │   ├── pharmacy.controller.js
│   │   │   └── pharmacy.routes.js
│   │
│   │   ├── admissions
│   │   │   ├── admission.model.js
│   │   │   ├── discharge.model.js
│   │   │   ├── admission.controller.js
│   │   │   └── admission.routes.js
│   │
│   │   ├── billing
│   │   │   ├── invoice.model.js
│   │   │   ├── invoiceItem.model.js
│   │   │   ├── payment.model.js
│   │   │   ├── refund.model.js
│   │   │   ├── billing.controller.js
│   │   │   └── billing.routes.js
│   │
│   │   ├── hr
│   │   │   ├── employee.model.js
│   │   │   ├── salary.model.js
│   │   │   ├── attendance.model.js
│   │   │   ├── payroll.model.js
│   │   │   ├── payrollItem.model.js
│   │   │   ├── hr.controller.js
│   │   │   └── hr.routes.js
│   │
│   │   ├── notifications
│   │   │   ├── notification.model.js
│   │   │   ├── notificationLog.model.js
│   │   │   ├── notification.controller.js
│   │   │   └── notification.routes.js
│   │
│   │   ├── services
│   │   │   ├── service.model.js
│   │   │   ├── serviceLog.model.js
│   │   │   ├── service.controller.js
│   │   │   └── service.routes.js
│   │
│   │   └── reports
│   │       ├── report.controller.js
│   │       └── report.routes.js
│   │
│   ├── routes
│   │   └── index.js   (combine all module routes)
│   │
│   ├── app.js
│   └── server.js
│
├── uploads
│
├── docs
│   └── swagger
│
├── tests
│
├── package.json
└── README.md