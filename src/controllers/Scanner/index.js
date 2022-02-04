// controllers/Scanner/index.js
const ScannerService = require("../../services/ScannerService");

exports.scannerservice_test = function(req, res) {
    // async function myFunc() {
    //     const {ScannerService} = await import("../../services/ScannerService.mjs");
    //     res.send(ScannerService.test("aaa"));
    // }
    // myFunc();
    res.send(ScannerService.test("aaa"));
};