const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const privateKeys = [fs.readFileSync(".secret").toString().trim()];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    bsc_testnet: {
      provider: () =>
        new HDWalletProvider(privateKeys, `https://data-seed-prebsc-2-s3.binance.org:8545`, 0, 1),
      network_id: 97,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(privateKeys, ``, 0, 1),
      network_id: 4,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    localhost: {
      provider: () => new HDWalletProvider(privateKeys, `http://127.0.0.1:8545`, 0, 1),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {
    timeout: 10000,
  },

  compilers: {
    solc: {
      version: "0.5.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
