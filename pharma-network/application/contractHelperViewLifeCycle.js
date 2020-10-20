const fs = require('fs');
const yaml = require('js-yaml');
const {
    FileSystemWallet,
    Gateway
} = require('fabric-network');
let gateway;



async function getContractInstance(orgName) {

    // A gateway defines which peer is used to access Fabric network
    // It uses a common connection profile (CCP) to connect to a Fabric Peer
    // A CCP is defined manually in file connection-profile-iit.yaml
    gateway = new Gateway();

    if (orgName == 'Manufacturer') {
        var wallet = new FileSystemWallet('./identity/manufacturer/');
        var fabricUserName = 'MANUFACTURER_ADMIN';
        var connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Manufacturer.yaml', 'utf8'));
    } else if (orgName == 'Distributor') {
        var wallet = new FileSystemWallet('./identity/distributor/');
        var fabricUserName = 'DISTRIBUTOR_ADMIN';
        var connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Distributor.yaml', 'utf8'));
    } else if (orgName == 'Retailer') {
        var wallet = new FileSystemWallet('./identity/retailer/');
        var fabricUserName = 'RETAILER_ADMIN';
        var connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Retailer.yaml', 'utf8'));
    } else if (orgName == 'Consumer') {
        var wallet = new FileSystemWallet('./identity/consumer/');
        var fabricUserName = 'CONSUMER_ADMIN';
        var connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Consumer.yaml', 'utf8'));
    } else if (orgName == 'Transporter') {
        var wallet = new FileSystemWallet('./identity/transporter/');
        var fabricUserName = 'TRANSPORTER_ADMIN';
        var connectionProfile = yaml.safeLoad(fs.readFileSync('./connection-profile/connection-profile-Transporter.yaml', 'utf8'));
    } else {
        return {
            message: 'Please enter valid organisation name.'
        };
    }

    // Set connection options; identity and wallet
    let connectionOptions = {
        wallet: wallet,
        identity: fabricUserName,
        discovery: {
            enabled: false,
            asLocalhost: true
        }
    };

    // Connect to gateway using specified parameters
    console.log('.....Connecting to Fabric Gateway');
    await gateway.connect(connectionProfile, connectionOptions);

    // Access certification channel
    console.log('.....Connecting to channel - pharmachannel');
    const channel = await gateway.getNetwork('pharmachannel');

    // Get instance of deployed Certnet contract
    // @param Name of chaincode
    // @param Name of smart contract
    console.log('.....Connecting to PHARMANET Smart Contract');
    return channel.getContract('pharmanet', 'org.pharma-network.viewLifeCycle');
}

function disconnect() {
    console.log('.....Disconnecting from Fabric Gateway');
    gateway.disconnect();
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;