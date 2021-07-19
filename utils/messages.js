'use strict';

const moment = require('moment');

function formateMessage(userName, text) {
    return ({
        text,
        userName,
        time: moment().format('h:mm a')
    });
}

module.exports=formateMessage;