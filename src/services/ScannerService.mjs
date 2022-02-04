// services/ScannerService.js
import * as tf from '@tensorflow/tfjs';
// import * as tf from '@tensorflow/tfjs-node';
//const {loadGraphModel} = require('tensorflow/tfjs-converter');
// const model = await loadGraphModel("./trasd_model_js.json");

export class ScannerService {

    constructor () {
        
    }

    static loadModel () {
        const model = tf.loadLayersModel("http://localhost:3500/routes/pages/model/model.json");
        return model;
    }

    static test (test) {
        console.log(test);
        let model = this.loadModel();
        return { success: true, body: model };
    }
}

// module.exports = ScannerService;
// export ScannerService;