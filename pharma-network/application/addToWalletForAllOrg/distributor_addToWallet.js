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

const fs = require("fs"); // FileSystem Library
const {
	FileSystemWallet,
	X509WalletMixin
} = require("fabric-network"); // Wallet Library provided by Fabric
const path = require("path"); // Support library to build filesystem paths in NodeJs

const crypto_materials = path.resolve(__dirname, "../network/crypto-config"); // Directory where all Network artifacts are stored

// A wallet is a filesystem path that stores a collection of Identities
const wallet = new FileSystemWallet("./identity/distributor");

async function main(certificatePath, privateKeyPath) {
	// Main try/catch block
	try {
		// Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
		const certificate = fs.readFileSync(certificatePath).toString();
		// IMPORTANT: Change the private key name to the key generated on your computer
		const privatekey = fs.readFileSync(privateKeyPath).toString();

		// Load credentials into wallet
		const identityLabel = "DISTRIBUTOR_ADMIN";
		const identity = X509WalletMixin.createIdentity(
			"distributorMSP",
			certificate,
			privatekey
		);

		await wallet.import(identityLabel, identity);
	} catch (error) {
		console.log(`Error adding to wallet. ${error}`);
		console.log(error.stack);
		throw new Error(error);
	}
}

main(
	"/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/signcerts/Admin@distributor.pharma-network.com-cert.pem",
	"/home/upgrad/Desktop/pharma-network/network/crypto-config/peerOrganizations/distributor.pharma-network.com/users/Admin@distributor.pharma-network.com/msp/keystore/19a9278985c4bca0be5584a6d32b79f626784a82d012de47c14674ed91c7deab_sk"
).then(() => {
	console.log("User - Distributor identity added to wallet.");
});

module.exports.execute = main;