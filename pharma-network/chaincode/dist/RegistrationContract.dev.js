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

var RegistrationContract =
/*#__PURE__*/
function (_Contract) {
  _inherits(RegistrationContract, _Contract);

  function RegistrationContract() {
    _classCallCheck(this, RegistrationContract);

    //name of the Smart Contract => registration
    return _possibleConstructorReturn(this, _getPrototypeOf(RegistrationContract).call(this, "org.pharma-network.registration"));
  } //All the custom functions are listed below
  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console


  _createClass(RegistrationContract, [{
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
     * Register an Organization on the network
     * @param ctx - The transaction context object
     * @param companyCRN - unique ID for company 
     * @param companyName - Name of the company 
     * @param location - company location
     * @param organisationRole - can only be anyone Manufacturer,Distributor, Retailer and Transporter 
     * @returns - new organization object 
     */

  }, {
    key: "registerCompany",
    value: function registerCompany(ctx, companyCRN, companyName, location, organisationRole) {
      var companyIdKey, fetchCompanyDetail, fetchCompanyData, hierarchyKey, newCompanyObject, dataBuffer;
      return regeneratorRuntime.async(function registerCompany$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              //create composite key companyidy
              companyIdKey = ctx.stub.createCompositeKey("org.pharma-network.companyId", [companyCRN, companyName]); //get the state from ledger to check if the company already exist

              _context2.next = 4;
              return regeneratorRuntime.awrap(ctx.stub.getState(companyIdKey)["catch"](function (err) {
                return console.log(err);
              }));

            case 4:
              fetchCompanyDetail = _context2.sent;
              _context2.prev = 5;
              fetchCompanyData = JSON.parse(fetchCompanyDetail.toString());
              return _context2.abrupt("return", {
                error: "Company already exist"
              });

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](5);

              if (!(organisationRole == "Manufacturer" || organisationRole == "Distributor" || organisationRole == "Retailer")) {
                _context2.next = 17;
                break;
              }

              if (organisationRole == "Manufacturer") {
                hierarchyKey = 1;
              } else if (organisationRole == "Distributor") {
                hierarchyKey = 2;
              } else {
                hierarchyKey = 3;
              }

              newCompanyObject = {
                companyID: companyIdKey,
                name: companyName,
                location: location,
                organisationRole: organisationRole,
                hierarchyKey: hierarchyKey
              }; //Hierarchy Key is only added for Manufacturer,Retailer and Distributor and not for Transporter 

              _context2.next = 22;
              break;

            case 17:
              if (!(organisationRole == "Transporter")) {
                _context2.next = 21;
                break;
              }

              newCompanyObject = {
                companyID: companyIdKey,
                name: companyName,
                location: location,
                organisationRole: organisationRole
              };
              _context2.next = 22;
              break;

            case 21:
              return _context2.abrupt("return", {
                error: "Please enter valid organization role"
              });

            case 22:
              dataBuffer = Buffer.from(JSON.stringify(newCompanyObject));
              console.log(newCompanyObject);
              _context2.next = 26;
              return regeneratorRuntime.awrap(ctx.stub.putState(companyIdKey, dataBuffer));

            case 26:
              return _context2.abrupt("return", newCompanyObject);

            case 27:
              _context2.next = 32;
              break;

            case 29:
              _context2.prev = 29;
              _context2.t1 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: "Unable to execute the function to register the Org, please make sure input parameters are correct.",
                errorTrace: _context2.t1.toString()
              });

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 29], [5, 10]]);
    }
  }]);

  return RegistrationContract;
}(Contract);

module.exports = RegistrationContract;