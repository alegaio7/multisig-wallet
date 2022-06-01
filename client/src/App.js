import React, {useState} from 'react';
import {getWeb3, getWallet} from './utils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState();
  const [transfers, setTransfers] = useState([]);
  // const [approvals, setApprovals] = useState([]);

  const init = async() => {
    const web3 = await getWeb3();
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    //const accounts = await web3.eth.getAccounts();
    const wallet = await getWallet(web3);
    const approvers = await wallet.methods.getApprovers().call();
    const quorum = await wallet.methods.quorum().call();
    const transfers = await wallet.methods.getTransfers().call();
    //const approvals = await wallet.methods.approvals(accounts[0]).call();

    setWeb3(web3);
    setAccounts(accounts);
    setWallet(wallet);
    setApprovers(approvers);
    setQuorum(quorum);
    setTransfers(transfers);
    //setApprovals(approvals);
  };

  useEffect(() => {
    init();
  }, []);

  const updateTransferList = async () => {
    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers);
  }

  const createTransfer = async(transfer) => {
    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0]});
    await updateTransferList();
  }

  const approveTransfer = async(transferId) => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]});
    await updateTransferList();
  }

  // const connectMetamask = async () => {
  //   await init();
  // }

  if(typeof web3 === 'undefined' || typeof accounts === 'undefined' || typeof wallet === 'undefined'
    || approvers.length === 0 || quorum === 'undefined') {
    return <div>
      {/* <button onClick={connectMetamask}>Connect metamask...</button> */}
      Loading...
    </div>;
  }

  return (
    <div>
      Multisig dapp
      <Header approvers={approvers} quorum={quorum}/>
      <NewTransfer createTransfer={createTransfer}></NewTransfer>
      <TransferList transfers={transfers} approveTransfer={approveTransfer} currentAccount={accounts[0]}></TransferList>
    </div>
  );
}

export default App;
