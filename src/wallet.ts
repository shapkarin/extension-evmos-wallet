
import { generateEndpointAccount } from '@tharsis/provider';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { AccountData } from '@cosmjs/proto-signing';
import { stringToPath } from '@cosmjs/crypto';

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