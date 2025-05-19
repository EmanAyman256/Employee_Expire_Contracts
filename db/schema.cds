namespace contracts;

entity Employees {
  key employeeId : String;
  firstName : String;
  lastName : String;
  email : String;
  managerId : String;
  managerEmail : String;
  contractEndDate : Date;
  contractStatus : String;
}