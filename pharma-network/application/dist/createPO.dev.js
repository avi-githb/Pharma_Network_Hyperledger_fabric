"use strict";
/*
Node JS app to create Purchase order on the network
*/

var helper = require("./contractHelperTransferDrug.js");

function main(buyerCRN, sellerCRN, drugName, quantity, organisationRole) {
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
          console.log("Creating new Purchase Order request");
          _context.next = 7;
          return regeneratorRuntime.awrap(Contract.submitTransaction("createPO", buyerCRN, sellerCRN, drugName, quantity));

        case 7:
          userBuffer = _context.sent;
          console.log("Processing new Purchase Order");
          newOrg = JSON.parse(userBuffer.toString());
          console.log(newOrg);
          console.log("Purchase Order now Created");
          return _context.abrupt("return", newOrg);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log("\n\n ".concat(_context.t0, " \n\n"));
          throw new Error(_context.t0);

        case 19:
          _context.prev = 19;
          console.log("Disconnect from fabric");
          helper.disconnect();
          return _context.finish(19);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15, 19, 23]]);
} // main("DIST001", "MAN001", "Paracetamol", "3", "Manufacturer").then(() => {
//   console.log("Purchase Order is now created.");
// });


module.exports.execute = main;