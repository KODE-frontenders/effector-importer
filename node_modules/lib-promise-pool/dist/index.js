"use strict";var _promise = require("babel-runtime/core-js/promise");var _promise2 = _interopRequireDefault(_promise);var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2); /**
                                                                                                                                                                                                                                                                                                                                                                                        * @typedef {Object} Options
                                                                                                                                                                                                                                                                                                                                                                                        * @property {boolean} Options.stopOnErr Stop on First Error
                                                                                                                                                                                                                                                                                                                                                                                        */

/**
                                                                                                                                                                                                                                                                                                                                                                                            * Controlls the number of concurrent async operations
                                                                                                                                                                                                                                                                                                                                                                                            * @param {Array<any>} arr Data Array
                                                                                                                                                                                                                                                                                                                                                                                            * @param {Function} worker Worker Function
                                                                                                                                                                                                                                                                                                                                                                                            * @param {Number} concurrency Concurrency number
                                                                                                                                                                                                                                                                                                                                                                                            * @param {Options} options Options for controlling execution
                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                            * @returns {Array<Object>}
                                                                                                                                                                                                                                                                                                                                                                                            */var PromisePool = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
    function _callee2() {var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var worker = arguments[1];var concurrency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;






        // Like a thread
        var runner = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {var _ind, item;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
                                ind < end)) {_context.next = 15;break;}
                                // Make a thread-safe copy of index
                                _ind = ind;

                                item = arr[ind++];

                                // Assign the result from worker to the same index as data was taken from
                                _context.prev = 3;_context.next = 6;return (
                                    worker(item, _ind));case 6:result[_ind] = _context.sent;_context.next = 14;break;case 9:_context.prev = 9;_context.t0 = _context["catch"](3);if (!

                                stopOnErr) {_context.next = 13;break;}throw new Error(_context.t0);case 13:
                                result[_ind] = _context.t0;case 14:return _context.abrupt("return",


                                runner());case 15:case "end":return _context.stop();}}}, _callee, this, [[3, 9]]);}));return function runner() {return _ref2.apply(this, arguments);};}();var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var _options$stopOnErr, stopOnErr, end, result, ind, runners, i;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_options$stopOnErr = options.stopOnErr, stopOnErr = _options$stopOnErr === undefined ? false : _options$stopOnErr;end = arr.length;result = [];ind = 0;



                        runners = [];

                        // Spawn threads
                        i = 0;case 6:if (!(i < concurrency)) {_context2.next = 13;break;}if (!(
                        i >= end)) {_context2.next = 9;break;}return _context2.abrupt("break", 13);case 9:
                        runners.push(runner());case 10:i++;_context2.next = 6;break;case 13:_context2.next = 15;return (


                            _promise2.default.all(runners));case 15:return _context2.abrupt("return",
                        result);case 16:case "end":return _context2.stop();}}}, _callee2, this);}));return function PromisePool() {return _ref.apply(this, arguments);};}();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


module.exports = PromisePool;