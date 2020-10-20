'use strict';
/*
Node JS app to add user in the property registration network
*/

var helper = require('./contractHelperTest');

function main(organisationRole) {
  var Contract, userBuffer;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(helper.getContractInstance());

        case 3:
          Contract = _context.sent;
          console.log('Creating new organisation registeration request');
          _context.next = 7;
          return regeneratorRuntime.awrap(Contract.submitTransaction('instantiate'));

        case 7:
          userBuffer = _context.sent;
          return _context.abrupt("return", userBuffer);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("\n\n ".concat(_context.t0, " \n\n"));
          throw new Error(_context.t0);

        case 15:
          _context.prev = 15;
          console.log('Disconnect from fabric');
          helper.disconnect();
          return _context.finish(15);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11, 15, 19]]);
}

main().then(function () {
  console.log("Organization Registration is now completed");
});
module.exports.execute = main;