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