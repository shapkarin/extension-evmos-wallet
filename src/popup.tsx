import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ethToEvmos, evmosToEth, cosmosToEth } from "@tharsis/address-converter";
import web3 from 'web3';
import { AccountData, DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import axios from 'axios';
import { createWallet, getAccount, initClient, getBalance } from './wallet';
// import interfaces from './interfaces';

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [address, setAddress] = useState<string>('');
  const [txs, setTxs] = useState([]);
  const [wallet, setWallet] = useState<DirectSecp256k1HdWallet>();
  // todo: client type
  const [client, setClient] = useState<any>();
  const [balance, setBalance] = useState<string>('')
  const [blockchain, setBlockchain] = useState('evmos');
  
  const changeBlockchain = function () {
    if (blockchain === 'evmos'){
      setAddress(evmosToEth(address));
      setBlockchain('eth')
    } else {
      setAddress(ethToEvmos(address));
      setBlockchain('evmos')
    }
  };

  useEffect(function() {
    (async () => {
      const wallet = await createWallet();
      const { address } = await getAccount(wallet);
      const client = await initClient();
      const balance = await getBalance(client, address);
      setClient(client);
      setWallet(wallet);
      setAddress(address);
      // setBalance(balance);
    })();
  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // (async () => {)();
  }, [address])

  return (
    <>
      <div>{ address }</div>
      <button onClick={changeBlockchain}>Switch</button>
      {txs.map((tx) => tx)}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
