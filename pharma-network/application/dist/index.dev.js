"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var port = 3000; //Import all functions

var addToWallet_manufacturer = require('./addToWalletForAllOrg/manufacturer_addToWallet.js');

var addToWallet_distributor = require('./addToWalletForAllOrg/distributor_addToWallet.js');

var addToWallet_retailer = require('./addToWalletForAllOrg/retailer_addToWallet.js');

var addToWallet_consumer = require('./addToWalletForAllOrg/consumer_addToWallet.js');

var addToWallet_transporter = require('./addToWalletForAllOrg/transporter_addToWallet.js');

var registerCompany = require('./registerCompany.js');

var addDrug = require('./addDrug.js');

var createPO = require('./createPO.js');

var createShipment = require('./createShipment');

var retailDrug = require('./retailDrug.js');

var updateShipment = require('./updateShipment.js');

var viewDrugCurrentState = require('./viewDrugCurrentState.js');

var viewHistory = require('./viewHistory.js'); //Define express app settings


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.set('title', 'Property Registration App');
app.get('/', function (req, res) {
  return res.send("Hello this is an App for Pharma Network Registration");
});
app.post('/addToWallet', function (req, res) {
  addToWallet_manufacturer.execute(req.body.certificatePath, req.body.privateKeyPath).then(function () {
    console.log('User credentials added to wallet');
    var result = {
      status: 'success',
      message: 'User credentials added to wallet'
    };
    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/addToWallet', function (req, res) {
  addToWallet_distributor.execute(req.body.certificatePath, req.body.privateKeyPath).then(function () {
    console.log('User credentials added to wallet');
    var result = {
      status: 'success',
      message: 'User credentials added to wallet'
    };
    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/addToWallet', function (req, res) {
  addToWallet_retailer.execute(req.body.certificatePath, req.body.privateKeyPath).then(function () {
    console.log('User credentials added to wallet');
    var result = {
      status: 'success',
      message: 'User credentials added to wallet'
    };
    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/addToWallet', function (req, res) {
  addToWallet_consumer.execute(req.body.certificatePath, req.body.privateKeyPath).then(function () {
    console.log('User credentials added to wallet');
    var result = {
      status: 'success',
      message: 'User credentials added to wallet'
    };
    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/addToWallet', function (req, res) {
  addToWallet_transporter.execute(req.body.certificatePath, req.body.privateKeyPath).then(function () {
    console.log('User credentials added to wallet');
    var result = {
      status: 'success',
      message: 'User credentials added to wallet'
    };
    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/registerCompany', function (req, res) {
  registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.Location, req.body.organisationRole, req.body.organisationRole1).then(function (company) {
    console.log('Registering a Company');
    var result; //if the return object contains error property then return status = failure 
    //if return object doesn't have error property then return status = success
    //returnObject.errorTace property will print more detailed error or trace logs

    if (company.error) {
      result = {
        status: 'Failure',
        message: 'Error while registering the company, condition to register company not fullfilled',
        error: company.error,
        errorTrace: company.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Company Registered',
        company: company
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/addDrug', function (req, res) {
  addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgDate, req.body.expDate, req.body.companyCRN, req.body.organisationRole).then(function (drug) {
    console.log('Adding Drug');
    var result;

    if (drug.error) {
      result = {
        status: 'Failure',
        message: 'Error while adding the drug',
        error: drug.error,
        errorTrace: drug.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Drug Added successfully',
        drug: drug
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/createPO', function (req, res) {
  createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName, req.body.quantity, req.body.organisationRole).then(function (purchaseOrder) {
    console.log('Creating Purchase Order');
    var result;

    if (purchaseOrder.error) {
      result = {
        status: 'Failure',
        message: 'Error while creating the purchase order',
        error: purchaseOrder.error,
        errorTrace: purchaseOrder.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Purchase order created successfully',
        purchaseOrder: purchaseOrder
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/createShipment', function (req, res) {
  createShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.listOfAssets, req.body.transporterCRN, req.body.organisationRole).then(function (shipment) {
    console.log('Creating Shipment');
    var result;

    if (shipment.error) {
      result = {
        status: 'Failure',
        message: 'Error while creating shipment',
        error: shipment.error,
        errorTrace: shipment.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Shipment created successfully',
        shipment: shipment
      };
    }

    res.status(500).send(result);
  });
});
app.post('/updateShipment', function (req, res) {
  updateShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.transporterCRN, req.body.organisationRole).then(function (shipment) {
    console.log('Updating Shipment');
    var result;

    if (shipment.error) {
      result = {
        status: 'Failure',
        message: 'Error while updating shipment',
        error: shipment.error,
        errorTrace: shipment.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Shipment updated successfully',
        shipment: shipment
      };
    }

    res.status(500).send(result);
  });
});
app.post('/retailDrug', function (req, res) {
  retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar, req.body.organisationRole).then(function (drug) {
    console.log('Drug Retail');
    var result;

    if (drug.error) {
      result = {
        status: 'Failure',
        message: 'Error while updating Drug asset details',
        error: drug.error,
        errorTrace: drug.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Drug details updated successfully',
        drug: drug
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/viewDrugCurrentState', function (req, res) {
  viewDrugCurrentState.execute(req.body.drugName, req.body.serialNo, req.body.organisationRole).then(function (drug) {
    console.log('View current state of the given Drug');
    var result;

    if (drug.error) {
      result = {
        status: 'Failure',
        message: 'Unable to fetch Drug asset details',
        error: drug.error,
        errorTrace: drug.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Drug details fetched successfully',
        drug: drug
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.post('/viewHistory', function (req, res) {
  viewHistory.execute(req.body.drugName, req.body.serialNo, req.body.organisationRole).then(function (drug) {
    console.log('View history of transaction on the drug');
    var result;

    if (drug.error) {
      result = {
        status: 'Failure',
        message: 'Unable to fetch Drug asset transaction history',
        error: drug.error,
        errorTrace: drug.errorTrace
      };
    } else {
      result = {
        status: 'success',
        message: 'Drug transaction history fetched successfully',
        drug: drug
      };
    }

    res.json(result);
  })["catch"](function (e) {
    var result = {
      status: 'error',
      message: 'Failed',
      error: e
    };
    res.status(500).send(result);
  });
});
app.listen(port, function () {
  return console.log("Distributed PharmaNetwork App listening on port ".concat(port, "!"));
});