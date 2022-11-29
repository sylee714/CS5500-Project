var Vaccination = artifacts.require("./Vaccination.sol")

module.exports = function (deployer) {
  deployer.deploy(Vaccination);
};