class Component {
  constructor(provider) {
    this.provider = provider;
  }

  getSender(sendObj = {}) {
    return sendObj.from || this.provider.eth.defaultAccount;
  }

  send(fn, ...args) {
    // Detecting if last argument is a web3 send object
    let sendObject = (typeof args[args.length - 1] === 'object') ? args.pop() : {};

    sendObject.from = this.getSender(sendObject);

    return fn(...args).send(sendObject);
  }

  async getNowTimestamp() {
    const block = await this.provider.eth.getBlock('latest');

    return block ? block.timestamp : 0;
  }
}

export default Component;
