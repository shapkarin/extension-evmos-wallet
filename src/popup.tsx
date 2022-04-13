import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ethToEvmos, evmosToEth, cosmosToEth } from "@tharsis/address-converter";
import web3 from 'web3';
import { generateEndpointAccount } from '@tharsis/provider';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { AccountData } from '@cosmjs/proto-signing';
import axios from 'axios';

export interface WalletAmount {
  denom: string;
  amount: string;
}

export interface TXFee {
  amount: WalletAmount[],
  gas: string;
}

export interface TXMsgValue {
  amount: WalletAmount[];
  from_address: string;
  to_address: string;
}

export interface TXMsg {
  type: string;
  value: TXMsgValue;
}

export interface TXValue {
  feed: TXFee;
  memo: string;
  msg: TXMsg[];
  signatures: unknown;
  timeout_height: string;
}

export interface TX {
  type: string;
  value: TXValue;
}

export interface TXLogEventAttribute {
  key: string;
  value: string;
}

export interface TXLogEvent {
  type: string;
  attributes: TXLogEventAttribute[];
}

export interface TXLog {
  events: TXLogEvent[];
}

export interface TransactionRaw {
  data: string;
  gas_used: string;
  gas_wanted: string;
  height: string;
  logs: TXLog[];
  raw_log: string; // JSON String
  timestamp: string;
  tx: TX;
  txhash: string;
}

// Transactions Response
export interface TransactionsResponse {
  count: string;
  limit: string;
  page_number: string;
  page_total: string;
  total_count: string;
  txs: TransactionRaw[];
}

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [address, setAddress] = useState('0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71');
  const [txs, setTxs] = useState([]);

  async function walletFromMnemonic(mnemonic: string) {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    return wallet;
  };
  
  async function getAddress() {
    const wallet = await walletFromMnemonic('aerobic year eight recycle couch minor adult absurd foil impose initial blood');
    const [account] = await wallet.getAccounts() as AccountData[];
    return account;
  }
  
  (async () => {
    const account = await getAddress();
    setAddress(address);
  });

  
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
      const { data: { txs: send = [] } } = await axios.get<TransactionsResponse>(`http://127.0.0.1:26657/txs?transfer.sender=${address}&message.module=bank`);
      const { data: { txs: receive = [] } }  = await axios.get<TransactionsResponse>(`http://127.0.0.1:26657/txs?transfer.recipient=${address}&message.module=bank`);
      const txs = [...send, ...receive];
      console.log(txs)
      // setTxs(txs || []);
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
