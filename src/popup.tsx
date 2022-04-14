import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ethToEvmos, evmosToEth, cosmosToEth } from "@tharsis/address-converter";
import web3 from 'web3';
import { AccountData, DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import axios from 'axios';
import { createWallet, getAccount } from './wallet';
// import interfaces from './interfaces';

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [address, setAddress] = useState<string>('');
  const [txs, setTxs] = useState([]);
  const [wallet, setWallet] = useState<DirectSecp256k1HdWallet>();

  
  const changeNet = function () {
    if (address.startsWith('0x')){
      setAddress(ethToEvmos(address));
    } else {
      setAddress(evmosToEth(address));
    }
  };

  useEffect(function() {
    (async () => {
      const wallet = await createWallet();
      const { address } = await getAccount(wallet);
      setWallet(wallet);
      setAddress(address);
    })();
  }, [])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    (async () => {
      try {
      // const { data: { txs: send = [] } } = await axios.get<TransactionsResponse>(`http://127.0.0.1:26657/txs?transfer.sender=${address}&message.module=bank`);
      const { data: { txs: send = [] } } = await axios.get(`http://127.0.0.1:26657/txs?transfer.sender=${address}&message.module=bank`);
      const { data: { txs: receive = [] } }  = await axios.get(`http://127.0.0.1:26657/txs?transfer.recipient=${address}&message.module=bank`);
      let txs = [...send, ...receive];
      if(address.startsWith('0x')){} 
      } catch (e) {
        console.log(e);
      }
      setTxs(txs);
    })();
  }, [address])

  return (
    <>
      <div>{ address }</div>
      <button onClick={changeNet}>Switch</button>
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
