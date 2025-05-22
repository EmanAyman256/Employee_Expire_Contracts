const cds = require('@sap/cds');
const { JobSchedulerClient } = require('@sap/jobs-client');
const xsenv = require('@sap/xsenv');

module.exports = async function () {
  const jobScheduler = new JobSchedulerClient({
    destination: xsenv.getServices({ jobscheduler: { tag: 'jobscheduler' } }).jobscheduler
  });

  const job = {
    action: '/employee/getExpiringContracts',
    type: 'REST',
    schedules: [{
      cron: '0 0 0 16 * ?', // Runs at midnight on the 16th of each month
      description: 'Fetch employees with expiring contracts'
    }]
  };

  jobScheduler.createJob(job, (error, result) => {
    if (error) {
      console.error('Failed to create job:', error);
    } else {
      console.log('Job created:', result);
    }
  });
};