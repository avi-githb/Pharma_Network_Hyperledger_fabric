"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("fabric-contract-api"),
    Contract = _require.Contract;

var DrugRegistrationContract =
/*#__PURE__*/
function (_Contract) {
  _inherits(DrugRegistrationContract, _Contract);

  //constructor to provide a name to the Smartcontract 
  function DrugRegistrationContract() {
    _classCallCheck(this, DrugRegistrationContract);

    //name of the Smart Contract => registration
    return _possibleConstructorReturn(this, _getPrototypeOf(DrugRegistrationContract).call(this, "org.pharma-network.drugRegistration"));
  }
  /* ****** All custom functions are defined below ***** */
  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console


  _createClass(DrugRegistrationContract, [{
    key: "instantiate",
    value: function instantiate(ctx) {
      return regeneratorRuntime.async(function instantiate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("Pharmanet Chaincode is Instantiated");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
    /**
     * Add and store Drug on the network
     * @param ctx - The transaction context object
     * @param drugName - asset to be added 
     * @param serialNo 
     * @param mfgDate 
     * @param expDate 
     * @param companyCRN - unique company CRN
     * @returns - drug object 
     */

  }, {
    key: "addDrug",
    value: function addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {
      var productIDKey, manufacturerCompKey, manuKey, newDrugObj, dataBuffer;
      return regeneratorRuntime.async(function addDrug$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (!(ctx.clientIdentity.getMSPID() != "manufacturerMSP")) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", {
                error: "Manufacturer Org can only add drugs on the pharma-network"
              });

            case 3:
              //composite key for storing drug
              productIDKey = ctx.stub.createCompositeKey("org.pharma-network.productIDKey", [serialNo, drugName]); //fetching manufacturer org details from the ledger using partial composite key 

              _context2.next = 6;
              return regeneratorRuntime.awrap(ctx.stub.getStateByPartialCompositeKey("org.pharma-network.companyId", [companyCRN]));

            case 6:
              manufacturerCompKey = _context2.sent;
              _context2.next = 9;
              return regeneratorRuntime.awrap(manufacturerCompKey.next());

            case 9:
              manuKey = _context2.sent;
              newDrugObj = {
                productID: productIDKey,
                name: drugName,
                manufacturer: manuKey.value.key,
                manufacturingDate: mfgDate,
                expiryDate: expDate,
                owner: manuKey.value.key,
                shipment: ""
              };
              dataBuffer = Buffer.from(JSON.stringify(newDrugObj)); //storing the new drug object on the ledger 

              _context2.next = 14;
              return regeneratorRuntime.awrap(ctx.stub.putState(productIDKey, dataBuffer));

            case 14:
              return _context2.abrupt("return", newDrugObj);

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: "Unable to register Drug on the network, check input parameters",
                errorTrace: _context2.t0.toString()
              });

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 17]]);
    }
  }]);

  return DrugRegistrationContract;
}(Contract);

module.exports = DrugRegistrationContract;