
const cds = require('@sap/cds');

module.exports = srv => {
  const { Employees } = srv.entities;

  srv.on('updateContract', async req => {
    const { employeeId, action, comments } = req.data;
    const tx = cds.transaction(req);

    try {
      if (action === 'renew') {
        const newEndDate = new Date();
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        const newEndDateStr = newEndDate.toISOString().split('T')[0];

        await tx.run(
          UPDATE(Employees)
            .set({ contractEndDate: newEndDateStr })
            .where({ employeeId: employeeId, contractStatus: 'Active' })
        );
        return `Contract for employee ${employeeId} renewed until ${newEndDateStr}. Comments: ${comments}`;
      } else if (action === 'terminate') {
        await tx.run(
          UPDATE(Employees)
            .set({ contractStatus: 'Terminated' })
            .where({ employeeId: employeeId, contractStatus: 'Active' })
        );
        return `Contract for employee ${employeeId} terminated. Comments: ${comments}`;
      } else if (action === 'renewWithStatus') {
        const newEndDate = new Date();
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        const newEndDateStr = newEndDate.toISOString().split('T')[0];
        const newStatus = comments.includes('6 Months') ? '6 Months' : 'Annual';

        await tx.run(
          UPDATE(Employees)
            .set({ contractEndDate: newEndDateStr, contractStatus: newStatus })
            .where({ employeeId: employeeId, contractStatus: 'Active' })
        );
        return `Contract for employee ${employeeId} renewed until ${newEndDateStr} with status ${newStatus}. Comments: ${comments}`;
      } else {
        req.error(400, `Invalid action: ${action}`);
      }
    } catch (error) {
      req.error(500, `Error processing action: ${error.message}`);
    }
  });
};




// const cds = require('@sap/cds');

// module.exports = srv => {
//   const { Employees } = srv.entities;

//   srv.on('getExpiringContracts', async req => {
//     const db = await cds.connect.to('db');
//     const result = await db.tx(req).execute('contracts.getExpiringContracts');
//     return result;
//   });

//   srv.on('updateContract', async req => {
//     // Existing implementation
//   });
// };
// const cds = require('@sap/cds');

// module.exports = srv => {
//   const { Employees, ExpiringContracts } = srv.entities;

//   srv.on('updateContract', async req => {
//     const { employeeId, action, comments } = req.data;
//     const tx = cds.transaction(req);

//     try {
//       if (action === 'renew') {
//         const newEndDate = new Date();
//         newEndDate.setFullYear(newEndDate.getFullYear() + 1);
//         const newEndDateStr = newEndDate.toISOString().split('T')[0];

//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractEndDate: newEndDateStr })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} renewed until ${newEndDateStr}. Comments: ${comments}`;
//       } else if (action === 'terminate') {
//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractStatus: 'Terminated' })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} terminated. Comments: ${comments}`;
//       } else if (action === 'renewWithStatus') {
//         const newEndDate = new Date();
//         newEndDate.setFullYear(newEndDate.getFullYear() + 1);
//         const newEndDateStr = newEndDate.toISOString().split('T')[0];
//         const newStatus = comments.includes('6 Months') ? '6 Months' : 'Annual';

//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractEndDate: newEndDateStr, contractStatus: newStatus })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} renewed until ${newEndDateStr} with status ${newStatus}. Comments: ${comments}`;
//       } else {
//         req.error(400, `Invalid action: ${action}`);
//       }
//     } catch (error) {
//       req.error(500, `Error processing action: ${error.message}`);
//     }
//   });
// };
//worked........
// const cds = require('@sap/cds');

// module.exports = srv => {
//   const { Employees, ExpiringContracts } = srv.entities;

//   srv.on('getExpiringContracts', async req => {
//     console.log('getExpiringContracts function triggered');
//     const result = await SELECT.from(ExpiringContracts);
//     console.log('Result from ExpiringContracts:', result);
//     return result;
  

//     // Option 2: Use the stored procedure (if preferred)
//     // const db = await cds.connect.to('db');
//     // return await db.tx(req).execute('contracts.getExpiringContracts');

//     // Option 3: Use the original query logic (if neither view nor procedure is used)
//     // const today = new Date();
//     // const threeMonthsLater = new Date();
//     // threeMonthsLater.setMonth(today.getMonth() + 3);

//     // const todayStr = today.toISOString().split('T')[0];
//     // const threeMonthsLaterStr = threeMonthsLater.toISOString().split('T')[0];

//     // return await SELECT.from(Employees).where({
//     //   contractStatus: 'Active',
//     //   contractEndDate: { '<=': threeMonthsLaterStr, '>=': todayStr }
//     // });
    
//   });

//   srv.on('updateContract', async req => {
//     // Existing implementation
//     const { employeeId, action, comments } = req.data;
//     const tx = cds.transaction(req);

//     try {
//       if (action === 'renew') {
//         const newEndDate = new Date();
//         newEndDate.setFullYear(newEndDate.getFullYear() + 1);
//         const newEndDateStr = newEndDate.toISOString().split('T')[0];

//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractEndDate: newEndDateStr })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} renewed until ${newEndDateStr}. Comments: ${comments}`;
//       } else if (action === 'terminate') {
//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractStatus: 'Terminated' })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} terminated. Comments: ${comments}`;
//       } else if (action === 'renewWithStatus') {
//         const newEndDate = new Date();
//         newEndDate.setFullYear(newEndDate.getFullYear() + 1);
//         const newEndDateStr = newEndDate.toISOString().split('T')[0];
//         const newStatus = comments.includes('6 Months') ? '6 Months' : 'Annual';

//         await tx.run(
//           UPDATE(Employees)
//             .set({ contractEndDate: newEndDateStr, contractStatus: newStatus })
//             .where({ employeeId: employeeId, contractStatus: 'Active' })
//         );
//         return `Contract for employee ${employeeId} renewed until ${newEndDateStr} with status ${newStatus}. Comments: ${comments}`;
//       } else {
//         req.error(400, `Invalid action: ${action}`);
//       }
//     } catch (error) {
//       req.error(500, `Error processing action: ${error.message}`);
//     }
//   });
// };