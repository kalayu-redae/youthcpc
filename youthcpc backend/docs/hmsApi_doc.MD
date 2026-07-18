
# youth cpc Management System (HMS) – API Documentation
Patient → Registration → Triage → Doctor → Lab/Pharmacy → Billing → Discharge
## Base URLs
- **Local:** `http://localhost:8085/api/hms`
- **Remote:** `https://hms.sophortechnologies.com/api/hms`
## Authentication፥
**Header:** Authorization: Bearer <token>
## Authorization (RBAC)
- `requirePermission('module:action')`
- `requirePermissionOrSelf('module:action')`
### Permissions: 'module:action'
* `module:view`
* `module:create`
* `module:update`
* `module:delete`
## 🏥 Common HTTP METHOD FOR MODULE
-CREATE,IMPORT
-VIEW one and ALL /FILTER/EXPORT
-UPDATE ONE/ALL
-DELETE ONE/ALL
-DOWNLOAD INTO EXPORT to Excel/PDF
## 🏥 Common Query Parameters
?page=&limit=&sortBy=&order=&search=&status=active|inactive
## 🏥 Standard Success Response
{
  "error": false,
  "status": 1,
  "message": "Success Message",
  "result": 10,
  "data": []
}
## 🏥 Standard Error Response
{
  "error": true,
  "status": 0,
  "message": "Error Message",
  "data": []
}
# 🔐 AUTHENTICATION & ACCESS CONTROL
## User
id, full_name, email, phone, password, role_id,
departmentId, status, profileImage,last_login, created_at
### APIs
Authentication Endpoints:
    POST   /auth/signup
    POST   /auth/login
    POST   /auth/forgetPassword
    POST   /auth/verifyOTP
    PATCH  /auth/resetPassword

    get    /auth/getMe
    PATCH  /auth/updateMe
    POST   /auth/updateMyPassword

user Endpoints:
    GET    /users
    DELETE /users

    GET    /users/:id
    PATCH  /users/:id
    DELETE /users/:id

    PATCH  /users/:id/status
    PATCH  /users/:id/resetPassword

    POST   /users/import
    GET    /users/export/excel
    GET    /users/export/pdf

### Relationships
User → Role
User → Department
User → UserPermission
## Role
id, name, description
### APIs
GET  /roles
POST /roles
PUT  /roles/:id
GET /role/:id/user
### Relationships
Role → Permissions (Many-to-Many)
## Permission
id, key, module, description
### API
GET  /permissions
POST /permissions
POST /permissions/assign-role
POST /permissions/assign-user

## AuditLog :Track sensitive actions
id, actor_user_id, action, target_table,
target_id, created_at
### APIs
GET /audit-logs
# 🏥 HOSPITAL STRUCTURE
## Hospital
id, name, region, city, phone, email, status,logo
## branch--to be seen
### APIs
GET  /hospitals
POST /hospitals
## Department
id, BusinessId, name, headUserId,status
## DepartmentStaff
id, departmentId, userID,status
### APIs
GET  /departments-staff
POST /departments-staff
## Ward/Block
id, departmentId, name, type,description,capacity,occupiedbeds,
### APIs
GET  /wards
POST /wards
## Room
id, wardId, room_number, type,capacity,occupiedBeds,status
### APIs
GET  /rooms
POST /rooms
## Bed
id, roomId, bed_number, status
### APIs
GET  /beds
POST /beds
PUT  /beds/:id/assign
# 🧍 PATIENT MANAGEMENT
## Patient
id, mrn, fullName(to be concatent),gender,
date_of_birth, email,phone,FAN,address, status
->userId should be added for futures for login
### APIs
GET  /patients
POST /patients
GET  /patients/:id
PUT  /patients/:id
//patients can view his history using his mrn publically
## PatientContact/Emergency contact
id, patient_id, name, relationship, phoneNumber,address,

### APIs
POST /patients/:id/contacts
GET /patients/:id/contacts
PATCH /patients/:id/contacts
DELETE /patients/:id/contacts
## PatientInsurance
id, patient_id, provider, policy_number, expiry_date,doc
# 🚑 TRIAGE & VITALS
## Triage
id, patient_id, severity, notes, assigned_departmentId
### APIs
POST /triage
GET  /triage/today

## VitalSign
id, patient_id, blood-group,blood_pressure, temperature,
pulse, weight, height, recorded_by, recorded_at
### APIs
POST /vitals
GET  /vitals/:patientId
# 👨‍⚕️ CONSULTATION & CLINICAL CARE
## Consultation
id, patient_id, doctor_id, departmentId,
complaint, consultation_date, status
### APIs
POST /consultations
GET  /consultations/:patientId

## Diagnosis
id, consultation_id,symptoms, description, icd_code
### APIs
POST /diagnoses
## Prescription
id, consultation_id, doctor_id, notes/instructions
## PrescriptionItem
id, prescription_id, medicine_id, dosage, frequency, duration
## FollowUp// appointment
id, consultation_id, followup_date, note
# 🧪 LABORATORY MANAGEMENT
## LabTest
id, name, price, normal_range
### APIs
GET  /labs/tests
POST /labs/tests
## LabOrder/LabRequest
id, consultation_id, ordered_by, priority, status
## LabOrderItem
id, lab_order_id, lab_test_id
## LabResult
id, lab_order_item_id, result_value, remarks,
verified_by, verified_at
# 🏥 INPATIENT (ADMISSION)
## Admission
id, patient_id, admitted_by, admission_date, reason, status
### APIs
POST /admissions
PUT  /admissions/:id/discharge
## BedAssignment and Room Assignemnt
id, admission_id, bed_id, assigned_at, released_at
## Discharge/outPatient
id, admission_id, discharge_date, summary
# 💊 PHARMACY MANAGEMENT (PMS)
instock-outstock-stock-
## Medicine
id, name, generic_name, category_id, unit, price,lowstockAlert
## MedicineCategory
id, name
## MedicineBatch
id, medicine_id, batch_number, expiry_date, quantity
## StockTransaction
id, medicine_id, type, quantity, reference, created_at
## Dispense
id, patient_id, prescription_id, dispensed_by, dispensed_at
## DispenseItem
id, dispense_id, medicine_id, quantity
# 💰 BILLING & FINANCE-to be seen in detail;
## Invoice
id, patient_id, total_amount, status, created_at
what about taxi/vat
### APIs
POST /billing/invoice
GET  /billing/invoice/:id
## InvoiceItem
id, invoice_id, item_type, item_id, amount
## Payment
id, invoice_id, amount, method, paid_at
## Refund
id, payment_id, amount, reason, refunded_at
# 👩‍💼 HR & PAYROLL
## Employee
id, user_id, job_title, salaryId, hire_date,endDate,employmenttype,status,
## Salary Model
id,employeedid,basicpay,bonuses,deductions,netpay,payschedule,lastpaidDate,
// how to add bonuses like duty,
//deduction also pension,taxi,donation...
## Attendance
id, employee_id, check_in, check_out,date
## Payroll
id, employeeId,sallaryId,month, year, total_amount, paymentDate,paymentMethod,status,notes
## PayrollItem
id, payroll_id, employee_id, amount
# 🔔 NOTIFICATIONS
## Notification(alert)-laborder/labresult.../expiredate/stockalert& outstock
id, user_id, title, message, is_read, created_at
## NotificationLog
id, notification_id, channel, sent_at
# 🧍Out-Service Model
id,name,description,price,category,status
# 🔔 API to be added
Out-Service Log Model
id,patientId,serviceId,performedby,price,notes
# 👩‍💼 REPORTS & DASHBOARDS
APIs
GET /reports/patients
GET /reports/revenue
GET /reports/pharmacy
GET /reports/labs
GET /reports/admissions
# 📊 File Handling
d
# Summary flow
Patient
 → Triage
 → Vitals
 → Consultation
   → Diagnosis
   → Prescription → Pharmacy → Invoice
   → LabOrder → LabResult → Invoice
 → Admission (optional)
 → Discharge
