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

var ViewLifeCycle =
/*#__PURE__*/
function (_Contract) {
  _inherits(ViewLifeCycle, _Contract);

  function ViewLifeCycle() {
    _classCallCheck(this, ViewLifeCycle);

    //name of the Smart Contract => registration
    return _possibleConstructorReturn(this, _getPrototypeOf(ViewLifeCycle).call(this, "org.pharma-network.viewLifeCycle"));
  } //All the custom functions are listed below
  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console


  _createClass(ViewLifeCycle, [{
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
    } //all custom fucntions

    /**
     * ViewHistory on the network
     * @param ctx - The transaction context object
     * @param drugName
     * @param serialNo
     * @returns - Trnasaction ID and details of each transaction
     */

  }, {
    key: "viewHistory",
    value: function viewHistory(ctx, drugName, serialNo) {
      var productIDKey, resultsIterator, allResults, res, jsonRes;
      return regeneratorRuntime.async(function viewHistory$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              productIDKey = ctx.stub.createCompositeKey("org.pharma-network.productIDKey", [serialNo, drugName]); //getting history using getHistoryForKey passing productIDKey(drug composite key)

              _context2.next = 4;
              return regeneratorRuntime.awrap(ctx.stub.getHistoryForKey(productIDKey));

            case 4:
              resultsIterator = _context2.sent;
              allResults = [];

            case 6:
              if (!true) {
                _context2.next = 19;
                break;
              }

              _context2.next = 9;
              return regeneratorRuntime.awrap(resultsIterator.next());

            case 9:
              res = _context2.sent;

              if (res.value && res.value.value.toString()) {
                jsonRes = {};
                console.log(res.value.value.toString("utf8"));
                jsonRes.TxId = res.value.tx_id;
                jsonRes.Timestamp = res.value.timestamp;
                jsonRes.IsDelete = res.value.is_delete.toString();

                try {
                  jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
                } catch (err) {
                  console.log(err);
                  jsonRes.Value = res.value.value.toString("utf8");
                }

                allResults.push(jsonRes);
              }

              if (!res.done) {
                _context2.next = 17;
                break;
              }

              console.log("end of data");
              _context2.next = 15;
              return regeneratorRuntime.awrap(resultsIterator.close());

            case 15:
              console.info(allResults);
              return _context2.abrupt("return", allResults);

            case 17:
              _context2.next = 6;
              break;

            case 19:
              _context2.next = 24;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: "Unable to fetch History of Drug asset on the network, check input parameters",
                errorTrace: _context2.t0.toString()
              });

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 21]]);
    }
    /**
     * View drug current state from the network
     * @param ctx - The transaction context object
     * @param drugName
     * @param serialNo
     * @returns - Drug object
     */

  }, {
    key: "viewDrugCurrentState",
    value: function viewDrugCurrentState(ctx, drugName, serialNo) {
      var productIDKey, dataBuffer;
      return regeneratorRuntime.async(function viewDrugCurrentState$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              productIDKey = ctx.stub.createCompositeKey("org.pharma-network.productIDKey", [serialNo, drugName]);
              _context3.next = 4;
              return regeneratorRuntime.awrap(ctx.stub.getState(productIDKey)["catch"](function (err) {
                console.log(err);
              }));

            case 4:
              dataBuffer = _context3.sent;
              return _context3.abrupt("return", JSON.parse(dataBuffer.toString()));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", {
                error: "Unable to view Current History of Drug asset on the network, check input parameters",
                errorTrace: _context3.t0.toString()
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }]);

  return ViewLifeCycle;
}(Contract);

module.exports = ViewLifeCycle;