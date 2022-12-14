// Module importé pour le temps
const moment = require ('moment');

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('HH:mm:ss')
    };
}

module.exports = formatMessage;