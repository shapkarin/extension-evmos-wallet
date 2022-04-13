import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ethToEvmos, evmosToEth } from "@tharsis/address-converter";
import web3 from 'web3';
import { generateEndpointAccount } from '@tharsis/provider';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [address, setAddress] = useState('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71');
  const [txs, setTxs] = useState([]);
  
  function walletFromMnemonic(mnemonic: string) {
    const wallet = DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    return wallet;
  };
  const wallet = walletFromMnemonic('aerobic year eight recycle couch minor adult absurd foil impose initial blood');
  console.log(wallet);
  
  const changeNet = function () {
    if (address.startsWith('0x')){
      setAddress(ethToEvmos(address));
    } else {
      setAddress(evmosToEth(address));
    }
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    (async () => {
      let addrRawData = await fetch(
        `http://127.0.0.1:26657/txs?transfer.sender=${address}`,
        options
      );
      console.log(addrRawData)
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
