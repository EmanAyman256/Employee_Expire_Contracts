const cds = require('@sap/cds');
const JobsClient = require('@sap/jobs-client');
const sendgrid = require('@sendgrid/mail');

module.exports = async function () {
  const scheduler = new JobsClient({
    url: process.env.JOBS_SCHEDULER_URL,
    user: process.env.JOBS_SCHEDULER_USER,
    password: process.env.JOBS_SCHEDULER_PASSWORD
  });

  const jobConfig = {
    name: 'ExpiringContractsJob',
    description: 'Notify managers of expiring contracts',
    action: async () => {
      const srv = await cds.connect.to('EmployeeService');
      const { ExpiringContracts } = srv.entities;
      const expiringContracts = await SELECT.from(ExpiringContracts);
      for (const employee of expiringContracts) {
        await sendEmailToManager(employee);
        console.log(`Notified manager ${employee.managerEmail} for employee ${employee.employeeId}`);
      }
    },
    schedule: '0 0 0 16 * *' // Runs at midnight on the 16th of every month
  };

  scheduler.scheduleJob(jobConfig, (err, result) => {
    if (err) console.error('Job scheduling failed:', err);
    else console.log('Job scheduled:', result);
  });
};

async function sendEmailToManager(employee) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: employee.managerEmail,
    from: 'no-reply@yourcompany.com',
    subject: `Contract Expiring for ${employee.firstName} ${employee.lastName}`,
    text: `The contract for ${employee.firstName} ${employee.lastName} (ID: ${employee.employeeId}) is expiring on ${employee.contractEndDate}. Please take action: Renew or Terminate.`,
    html: `<p>The contract for <strong>${employee.firstName} ${employee.lastName}</strong> (ID: ${employee.employeeId}) is expiring on <strong>${employee.contractEndDate}</strong>.</p><p>Please take action: <a href="http://your-app-url/employee-action?employeeId=${employee.employeeId}">Renew or Terminate</a>.</p>`
  };

  await sendgrid.send(msg);
  console.log(`Email sent to ${employee.managerEmail}`);
}