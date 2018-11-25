
const blindState = {
  open: 'open',
  closed: 'closed' ,
  opening: 'opening',
  closing: 'closing',
  stopped: 'stopped',
  unknown: 'unknown'
}

class Blind {
  constructor(name, pin, options) {
    this.name = name;
    this.pin = pin;
  }
}

module.exports = {
  blindState
}