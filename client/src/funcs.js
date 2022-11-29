import Vaccination from './contracts/Vaccination.json'
import Web3 from 'web3';
// import { Contract, ethers } from  "ethers";
// var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    // const addressAccount = await loadAccount();
    const { vacContract } = await loadContract(addressAccount);

    return { vacContract };
};

// const loadPatients = async (vacContract) => {
//     const patients = await vacContract.fetchPatients();
//     return patients
// };

// const addPatient = async (vacContract) => {

// }

const loadContract = async (addressAccount) => {
    const theContract = contract(Vaccination);
    theContract.setProvider(web3.eth.currentProvider);
    const vacContract = await theContract.deployed();
    // const patients = await loadPatients(vacContract);

    return { vacContract }
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};