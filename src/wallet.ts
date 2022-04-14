
import { generateEndpointAccount } from '@tharsis/provider';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { AccountData } from '@cosmjs/proto-signing';
import { stringToPath } from '@cosmjs/crypto';
// import getTransactions from @tharsis/transactions
import { StargateClient } from "@cosmjs/stargate";

export async function createWallet() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
    "dynamic mixed dutch van come bundle fringe define wear other ranch dish",
    {
      hdPaths: [stringToPath("m/44'/60'/0'/0/0")],
      prefix: 'evmos'
    }
  );
  return wallet;
};

export async function getAccount(wallet: DirectSecp256k1HdWallet) {
  const [account] = await wallet.getAccounts() as AccountData[];
  return account;
}

export async function initClient(){
  return StargateClient.connect('http://127.0.0.1:26657');
}

// todo: add type
export async function getBalance(cosmjsClient: any, address: string){
  const balances = await cosmjsClient.getAllBalances(address);
  // console.log(balances);
  return {
    cosmos: '',
    eth: ''
  }
}

// export async function getTransactions() {
//   try {
//     // const { data: { txs: send = [] } } = await axios.get<TransactionsResponse>(`http://127.0.0.1:26657/txs?transfer.sender=${address}&message.module=bank`);
//     const { data: { txs: send = [] } } = await axios.get(`http://127.0.0.1:26657/txs?transfer.sender=${address}&message.module=bank`);
//     const { data: { txs: receive = [] } }  = await axios.get(`http://127.0.0.1:26657/txs?transfer.recipient=${address}&message.module=bank`);
//     let txs = [...send, ...receive];
//     } catch (e) {
//       console.log(e);
//     }
//     setTxs(txs);
//   }
// }

// export async function getTransactions(){ }