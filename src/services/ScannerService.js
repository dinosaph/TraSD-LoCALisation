// services/ScannerService.js
//import * as tf from '@tensorflow/tfjs';
// import * as tf from '@tensorflow/tfjs-node';
//const {loadGraphModel} = require('tensorflow/tfjs-converter');
// const model = await loadGraphModel("./trasd_model_js.json");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');


class ScannerService {

    constructor () {
        
    }

    static loadModel () {
        // const model = await tf.loadLayersModel("file://services//trasd_model//model.json");
        let model = await tf.loadModel("file://services//trasd_model//model.json");
        return model;
    }

    static test (test) {
        console.log(test);
        //let model = this.loadModel();
        let model = tf.loadLayersModel("file://services//trasd_model//model.json");
        model.then(function (res) {
            const example = tf.browser.fromPixels(canvas);
            const prediction = res.predict(example);
            console.log(prediction);
        }, function (err) {
            console.log(err);
        });
        return model;
    }
}

module.exports = ScannerService;
// export ScannerService;