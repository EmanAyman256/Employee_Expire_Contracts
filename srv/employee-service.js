this.on('getExpiringContracts', async (req) => {
  try {
    const today = new Date('2025-05-19'); // Hardcoded for testing
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const todayStr = today.toISOString().split('T')[0]; // "2025-05-19"
    const threeMonthsLaterStr = threeMonthsLater.toISOString().split('T')[0]; // "2025-08-18"

    const employees = await cds.run(
      SELECT.from(Employees)
        .where('contractEndDate >=', todayStr)
        .and('contractEndDate <=', threeMonthsLaterStr)
        .and({ contractStatus: 'Active' })
    );

    console.log('Today:', todayStr);
    console.log('Three Months Later:', threeMonthsLaterStr);
    console.log('Fetched Employees:', employees);
    return employees;
  } catch (error) {
    req.error(500, `Error fetching expiring contracts: ${error.message}`);
  }
});