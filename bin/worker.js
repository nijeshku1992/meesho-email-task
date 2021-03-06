// my_queue_worker.js

const Queue = require('firebase-queue'),
    config = require('../configs/config');

const EmailHistory = require("../models/email_history");

var refQueue = config.FIREBASE_ADMIN.database().ref(config.FB_QUEUE_PATH);


console.log("worker started");

const queue = new Queue(refQueue, function (data, progress, resolve, reject) {

    switch (data.channel){
        case "create-order": {
            EmailHistory.processEmailForItem(data.order_id, "order", null).catch((err) => {
            });
            break;
        }
        default:

    }

    // Finish the task asynchronously
    setTimeout(function() {
        resolve();
    }, 1000);
});
