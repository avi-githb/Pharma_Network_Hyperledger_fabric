'use strict';
/*
Node JS app to view Drug current state on the network
*/

var helper = require('./contractHelperViewLifeCycle.js');

function main(drugName, serialNo, organisationRole) {
  var Contract, userBuffer, newOrg;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(helper.getContractInstance(organisationRole));

        case 3:
          Contract = _context.sent;
          //console.log(Contract);
          console.log('View Drug current state Initialized');
          _context.next = 7;
          return regeneratorRuntime.awrap(Contract.submitTransaction('viewDrugCurrentState', drugName, serialNo));

        case 7:
          userBuffer = _context.sent;
          console.log('Processing View Drug current state');
          newOrg = JSON.parse(userBuffer.toString());
          console.log(newOrg);
          console.log('View Drug current state is now processed');
          return _context.abrupt("return", newOrg);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log("\n\n ".concat(_context.t0, " \n\n"));
          throw new Error(_context.t0);

        case 19:
          _context.prev = 19;
          console.log('Disconnect from fabric');
          helper.disconnect();
          return _context.finish(19);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15, 19, 23]]);
} // main('disp', '010', 'Manufacturer').then(() => {
//     console.log("View Drug current state.");
// });


module.exports.execute = main;