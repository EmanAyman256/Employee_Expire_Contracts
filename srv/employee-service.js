const cds = require('@sap/cds');

module.exports = srv => {
  const { Employees } = srv.entities;

  srv.on('getExpiringContracts', async req => {
    const tx = cds.transaction(req);

    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const todayStr = today.toISOString().split('T')[0];
    const endStr = threeMonthsLater.toISOString().split('T')[0];

    const result = await tx.run(
      SELECT.from(Employees).where([
        { contractStatus: 'Active' }])
    );

    return result;
  });
};
