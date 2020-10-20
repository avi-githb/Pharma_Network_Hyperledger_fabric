"use strict";

var registrationcontract = require("./RegistrationContract.js");

var drugRegistrationcontract = require("./DrugRegistration.js");

var transferDrugContract = require("./TransferDrug.js");

var viewLifecycleContract = require("./ViewLifeCycle.js");

module.exports.contracts = [registrationcontract, drugRegistrationcontract, transferDrugContract, viewLifecycleContract];