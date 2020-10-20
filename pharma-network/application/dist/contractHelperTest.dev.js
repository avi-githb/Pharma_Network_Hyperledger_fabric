"use strict";

var fs = require('fs');

var yaml = require('js-yaml');

var _require = require('fabric-network'),
    Wallets = _require.Wallets,
    Gateway = _require.Gateway;

var gateway;

function getContractInstance() {
  var wallet, fabricUserName, connectionProfile, connectionOptions, channel;
  return regeneratorRuntime.async(function getContractInstance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // A gateway defines which peer is used to access Fabric network
          // It uses a common connection profile (CCP) to connect to a Fabric Peer
          // A CCP is defined manually in file connection-profile-iit.yaml
          gateway = new Gateway(); // A wallet is where the credentials to be used for this transaction exist
          // Credentials for user IIT_ADMIN was initially added to this wallet.

          _context.next = 3;
          return regeneratorRuntime.awrap(Wallets.newFileSystemWallet('./identity/manufacturer/'));

        case 3:
          wallet = _context.sent;
          // What is the username of this Client user accessing the network?
          fabricUserName = 'MANUFACTURER_ADMIN'; // Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.

          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Manufacturer.yaml', 'utf8')); // Set connection options; identity and wallet

          connectionOptions = {
            wallet: wallet,
            identity: fabricUserName,
            discovery: {
              enabled: false,
              asLocalhost: true
            }
          }; // Connect to gateway using specified parameters

          console.log('.....Connecting to Fabric Gateway');
          _context.next = 10;
          return regeneratorRuntime.awrap(gateway.connect(connectionProfile, connectionOptions));

        case 10:
          // Access certification channel
          console.log('.....Connecting to channel - pharmachannel');
          _context.next = 13;
          return regeneratorRuntime.awrap(gateway.getNetwork('pharmachannel'));

        case 13:
          channel = _context.sent;
          // Get instance of deployed Certnet contract
          // @param Name of chaincode
          // @param Name of smart contract
          console.log('.....Connecting to Pharmanet Smart Contract');
          return _context.abrupt("return", channel.getContract('pharmanet', 'org.pharma-network.registration'));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

function disconnect() {
  console.log('.....Disconnecting from Fabric Gateway');
  gateway.disconnect();
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;