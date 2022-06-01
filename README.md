# Multisig Dapp

Multisig Dapp is a decentralised application that implements a multi-signature wallet, that is, a wallet that requires N number of approvals in order to perform a transfer of funds from the wallet to a recipient.

## The code

The code has 2 main components:
- The wallet smart contract, under the /contracts folder
- The frontend (UI), under the /client folder

The contract is written in solidity, while the frontend app is a simple react application.

## Running the code

In order to run the code locally, truffle must be installed.
In a console window, run:
```
truffle develop
```

This will start a local environment that simulates the ethereum blockchain.
Then run inside the command prompt of truffle:
```
migrate --reset
```
This will compile the smart contracts and deploy them to the local blockchain.

In a second console window, run the client from withing the /client folder:
```
npm start
```

## Requirements/dependencies
- NodeJS (I used v16.14.0)
- A code editor (like VS Code with the Solidity extension)
- Metamask wallet (Chrome extension)

## License

MIT
