const path = require('path');
const fs = require('fs');
const provider = require('@truffle/hdwallet-provider')
const secrets = JSON.parse(fs.readFileSync('.secrets.json').toString().trim());

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 9545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    kovan: {
      provider: () => new provider(
        secrets.privateKeys,
        'https://kovan.infura.io/v3/af344da9c0af4d27afa2d1a01815ad72',
        0,
        3
      ),
      network_id: 42
    }
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
