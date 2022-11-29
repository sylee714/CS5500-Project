// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// // import { ChakraProvider } from '@chakra-ui/react'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <ChakraProvider>
//   //   <App />
//   // </ChakraProvider>
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // import; object
// const Web3 = require("web3");
// const MyContract = require("./contracts/MyContract.json");
// // const SimpleStorage = require("./contracts/SimpleStorage.json");

// // const customProvider = {
// //   sendAsync: (payload, cb) => {
// //     console.log('you called');
// //     console.log(payload);
// //     // cb(undefined, 100);
// //   }
// // };

// const init = async () => {
//   const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

//   const web3 = new Web3(provider);
//   const networkId = await web3.eth.net.getId();
//   const deployedNetwork = MyContract.networks[networkId];
//   // console.log(MyContract.abi);
//   // console.log(deployedNetwork.address);
//   const contract = new web3.eth.Contract(
//     MyContract.abi,
//     deployedNetwork.address
//   );

//   const addresses = await web3.eth.getAccounts();
//   console.log(addresses);
//   // const result = await contract.methods.read().call();
//   // console.log(result);
//   // await contract.methods.write(123).call();
//   // const result1 = await contract.methods.read().call();
//   // console.log(result1);

//   const result = await contract.methods.getData().call();
//   console.log(result);
//   await contract.methods.setData(123).send({
//     from: addresses[0]
//   });
//   const result1 = await contract.methods.getData().call();
//   console.log(result1);

// }

// init();

// original
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

