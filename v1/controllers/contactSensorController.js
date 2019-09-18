const debug = require('debug')('contactSensorController');
import { publishToQueue } from '../service/messageService';

class ContactSensorController {

  static getContactSensors() {
    debug(`getBlinds`);
    return Promise.resolve([]);
    //  return blindsDB.getRecords([], 'contactSensors');
  }

  static didChangeState(payload) {
    debug(`didChangeState`);
    const queueName = "contactSensorQueue"
    publishToQueue(JSON.stringify(payload), queueName);
    return Promise.resolve([]);
    //  return blindsDB.getRecords([], 'contactSensors');
  }

}

module.exports = ContactSensorController;
