"use strict";

const registrationcontract = require("./RegistrationContract.js");
const drugRegistrationcontract = require("./DrugRegistration.js");
const transferDrugContract = require("./TransferDrug.js");
const viewLifecycleContract = require("./ViewLifeCycle.js");

module.exports.contracts = [registrationcontract, drugRegistrationcontract, transferDrugContract, viewLifecycleContract];