// using { contracts as my } from '../db/schema';

// service EmployeeService @(path: '/employee') {
//   entity Employees as projection on my.Employees;
//   action getExpiringContracts() returns array of Employees;
//   action updateContract(employeeId: String, action: String, comments: String) returns String;
// }
using { contracts as my } from '../db/schema';

service EmployeeService @(path: '/employee') {
  entity Employees as projection on my.Employees;
  entity ExpiringContracts as projection on my.getExpiringContracts;
  action updateContract(employeeId: String, action: String, comments: String) returns String;
}