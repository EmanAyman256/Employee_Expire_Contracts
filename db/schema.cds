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
// view getExpiringContracts as
//   select from contracts.Employees
//   where
//     contractStatus = 'Active' and
//     contractEndDate between add_days(current_date, 0) and add_days(current_date, 90);
view getExpiringContracts as
  select from contracts.Employees
  where
    contractStatus = 'Active'
    and contractEndDate between ADD_DAYS(CURRENT_DATE, 0) and ADD_DAYS(CURRENT_DATE, 90);