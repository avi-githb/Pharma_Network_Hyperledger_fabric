"use strict";
/**
 * This is a Node.JS module to load a user's Identity to his wallet.
 * This Identity will be used to sign transactions initiated by this user.
 * Defaults:
 *  User Name: transporter_ADMIN
 *  User Organization: transporter
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

var wallet = new FileSystemWallet("./identity/transporter");

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

          identityLabel = "TRANSPORTER_ADMIN";
          identity = X509WalletMixin.createIdentity("transporterMSP", certificate, privatekey);
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

main("/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/signcerts/Admin@transporter.pharma-network.com-cert.pem", "/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/transporter.pharma-network.com/users/Admin@transporter.pharma-network.com/msp/keystore/5c0808673f25ee5f43ceab8984d6fe51108a399cef1eb17414b557fcc99afc03_sk").then(function () {
  console.log("User - Transporter identity added to wallet.");
});
module.exports.execute = main;