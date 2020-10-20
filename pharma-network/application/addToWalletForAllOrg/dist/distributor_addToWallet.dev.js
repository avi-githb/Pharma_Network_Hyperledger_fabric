"use strict";
/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: distributor_ADMIN
 *  User Organization: distributor
 *  User Role: Admin
 *
 */

var fs = require("fs"); // FileSystem Library


var _require = require("fabric-network"),
    FileSystemWallet = _require.FileSystemWallet,
    X509WalletMixin = _require.X509WalletMixin; // Wallet Library provided by Fabric


var path = require("path"); // Support library to build filesystem paths in NodeJs


var crypto_materials = path.resolve(__dirname, "../network/crypto-config"); // Directory where all Network artifacts are stored
// A wallet is a filesystem path that stores a collection of Identities

var wallet = new FileSystemWallet("./identity/distributor");

function main(certificatePath, privateKeyPath) {
  var certificate, privatekey, identityLabel, identity;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
          certificate = fs.readFileSync(certificatePath).toString(); // IMPORTANT: Change the private key name to the key generated on your computer

          privatekey = fs.readFileSync(privateKeyPath).toString(); // Load credentials into wallet

          identityLabel = "DISTRIBUTOR_ADMIN";
          identity = X509WalletMixin.createIdentity("distributorMSP", certificate, privatekey);
          _context.next = 7;
          return regeneratorRuntime.awrap(wallet["import"](identityLabel, identity));

        case 7:
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log("Error adding to wallet. ".concat(_context.t0));
          console.log(_context.t0.stack);
          throw new Error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

main("/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem", "/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/19a9278985c4bca0be5584a6d32b79f626784a82d012de47c14674ed91c7deab_sk").then(function () {
  console.log("User - Distributor identity added to wallet.");
});
module.exports.execute = main;