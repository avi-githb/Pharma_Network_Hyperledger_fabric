'use strict';
/*
Node JS app to register company on the network
*/

var helper = require('./contractHelper.js');

function main(companyCRN, companyName, Location, organisationRole, organisationRole1) {
  var Contract, userBuffer, newOrg;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(helper.getContractInstance(organisationRole1));

        case 3:
          Contract = _context.sent;
          //console.log(Contract);
          console.log('Creating new organisation registeration request');
          _context.next = 7;
          return regeneratorRuntime.awrap(Contract.submitTransaction('registerCompany', companyCRN, companyName, Location, organisationRole));

        case 7:
          userBuffer = _context.sent;
          console.log('Processing request to register a new organization');
          newOrg = JSON.parse(userBuffer.toString());
          console.log(newOrg);
          console.log('New Organization is now registered');
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
} // main('351', 'd', 'India', 'Transporter').then(() => {
//   console.log("Organization Registration is now completed");
// });


module.exports.execute = main;