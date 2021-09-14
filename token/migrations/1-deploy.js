const Ware = artifacts.require("Ware");
const Rena = artifacts.require("Rena");
const Warena = artifacts.require("Warena");
const Faucet = artifacts.require("Faucet");

module.exports = function (deployer) {
  deployer.deploy(Ware, "1000000000000000000000000000"); // ERC20
  // deployer.deploy(Rena, "1000000000000000000000000000"); // ERC20
  // deployer.deploy(Warena, "Warena", "War"); // ERC721
  // deployer.deploy(Faucet, "0xfB2bA2F55Cfbd1b7E3796714E5684474CF25ebc7", "50000000000000000000");
};
