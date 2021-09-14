const TransferProxy = artifacts.require("TransferProxy");
const TransferProxyForDeprecated = artifacts.require("TransferProxyForDeprecated");
const ERC20TransferProxy = artifacts.require("ERC20TransferProxy");
const ExchangeStateV1 = artifacts.require("ExchangeStateV1");
const ExchangeOrdersHolderV1 = artifacts.require("ExchangeOrdersHolderV1");
const ExchangeV1 = artifacts.require("ExchangeV1");

module.exports = async function (deployer, network) {
  if (network === "development") return;

  const BENEFICIARY_ADDRESS = "0x4247f8beE3F20C7DE891FB38d9164A7A0e9A723F";
  const BUYER_FEE_SIGNER_ADDRESS = "0x4247f8beE3F20C7DE891FB38d9164A7A0e9A723F";

  await deployer.deploy(TransferProxy);
  await deployer.deploy(TransferProxyForDeprecated);
  await deployer.deploy(ERC20TransferProxy);
  await deployer.deploy(ExchangeStateV1);
  await deployer.deploy(ExchangeOrdersHolderV1);

  const [
    transferProxyInst,
    transferProxyForDeprecatedInst,
    erc20TransferProxyInst,
    exchangeStateV1Inst,
    exchangeOrdersHolderV1Inst,
  ] = await Promise.all([
    TransferProxy.deployed(),
    TransferProxyForDeprecated.deployed(),
    ERC20TransferProxy.deployed(),
    ExchangeStateV1.deployed(),
    ExchangeOrdersHolderV1.deployed(),
  ]);

  await deployer.deploy(
    ExchangeV1,
    transferProxyInst.address,
    transferProxyForDeprecatedInst.address,
    erc20TransferProxyInst.address,
    exchangeStateV1Inst.address,
    exchangeOrdersHolderV1Inst.address,
    BENEFICIARY_ADDRESS,
    BUYER_FEE_SIGNER_ADDRESS
  );

  const exchangeV1Inst = await ExchangeV1.deployed();

  await transferProxyInst.addOperator(exchangeV1Inst.address);
  await transferProxyForDeprecatedInst.addOperator(exchangeV1Inst.address);
  await erc20TransferProxyInst.addOperator(exchangeV1Inst.address);
  await exchangeStateV1Inst.addOperator(exchangeV1Inst.address);

  console.log(`TransferProxy: ${transferProxyInst.address}`);
  console.log(`TransferProxyForDeprecated: ${transferProxyForDeprecatedInst.address}`);
  console.log(`ERC20TransferProxy: ${erc20TransferProxyInst.address}`);
  console.log(`ExchangeStateV1: ${exchangeStateV1Inst.address}`);
  console.log(`ExchangeOrdersHolderV1: ${exchangeOrdersHolderV1Inst.address}`);
  console.log(`ExchangeV1: ${exchangeV1Inst.address}`);
};
