// services/ScannerService.js

class ScannerService {

    constructor () {
        
    }

    test (test) {
        console.log(test);
        return { success: true, body: test };
    }
}

module.exports = ScannerService;