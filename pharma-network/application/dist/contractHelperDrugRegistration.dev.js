"use strict";

var fs = require('fs');

var yaml = require('js-yaml');

var _require = require('fabric-network'),
    FileSystemWallet = _require.FileSystemWallet,
    Gateway = _require.Gateway;

var gateway;

function getContractInstance(orgName) {
  var wallet, fabricUserName, connectionProfile, connectionOptions, channel;
  return regeneratorRuntime.async(function getContractInstance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // A gateway defines which peer is used to access Fabric network
          // It uses a common connection profile (CCP) to connect to a Fabric Peer
          // A CCP is defined manually in file connection-profile-iit.yaml
          gateway = new Gateway();

          if (!(orgName == 'Manufacturer')) {
            _context.next = 7;
            break;
          }

          wallet = new FileSystemWallet('./identity/manufacturer/');
          fabricUserName = 'MANUFACTURER_ADMIN';
          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Manufacturer.yaml', 'utf8'));
          _context.next = 32;
          break;

        case 7:
          if (!(orgName == 'Distributor')) {
            _context.next = 13;
            break;
          }

          wallet = new FileSystemWallet('./identity/distributor/');
          fabricUserName = 'DISTRIBUTOR_ADMIN';
          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Distributor.yaml', 'utf8'));
          _context.next = 32;
          break;

        case 13:
          if (!(orgName == 'Retailer')) {
            _context.next = 19;
            break;
          }

          wallet = new FileSystemWallet('./identity/retailer/');
          fabricUserName = 'RETAILER_ADMIN';
          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Retailer.yaml', 'utf8'));
          _context.next = 32;
          break;

        case 19:
          if (!(orgName == 'Consumer')) {
            _context.next = 25;
            break;
          }

          wallet = new FileSystemWallet('./identity/consumer/');
          fabricUserName = 'CONSUMER_ADMIN';
          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Consumer.yaml', 'utf8'));
          _context.next = 32;
          break;

        case 25:
          if (!(orgName == 'Transporter')) {
            _context.next = 31;
            break;
          }

          wallet = new FileSystemWallet('./identity/transporter/');
          fabricUserName = 'TRANSPORTER_ADMIN';
          connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Transporter.yaml', 'utf8'));
          _context.next = 32;
          break;

        case 31:
          return _context.abrupt("return", {
            message: 'Please enter valid organisation name.'
          });

        case 32:
          // Set connection options; identity and wallet
          connectionOptions = {
            wallet: wallet,
            identity: fabricUserName,
            discovery: {
              enabled: false,
              asLocalhost: true
            }
          }; // Connect to gateway using specified parameters

          console.log('.....Connecting to Fabric Gateway');
          _context.next = 36;
          return regeneratorRuntime.awrap(gateway.connect(connectionProfile, connectionOptions));

        case 36:
          // Access certification channel
          console.log('.....Connecting to channel - pharmachannel');
          _context.next = 39;
          return regeneratorRuntime.awrap(gateway.getNetwork('pharmachannel'));

        case 39:
          channel = _context.sent;
          // Get instance of deployed Certnet contract
          // @param Name of chaincode
          // @param Name of smart contract
          console.log('.....Connecting to PHARMANET Smart Contract');
          return _context.abrupt("return", channel.getContract('pharmanet', 'org.pharma-network.drugRegistration'));

        case 42:
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