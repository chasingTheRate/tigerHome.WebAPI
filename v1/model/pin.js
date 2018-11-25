const readWrite = {
  read: 'read',
  write: 'write'
}

const direction = {
  in: 'in',
  out: 'out',
  both: 'both'
}

class Pin {
  constructor(id, readWrite, direction) {
    this.id = id;
    this.readWrite = readWrite;
    this.direction = direction;
  }

  static get readWrite(){
    return readWrite;
  }

  static get direction(){
    return direction;
  }
}

module.exports = Pin;
