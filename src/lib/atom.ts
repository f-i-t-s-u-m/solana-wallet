import { atomWithStorage } from "jotai/utils";

export const rpcUrlAtom = atomWithStorage(
  "rpc_url",
  "https://api.devnet.solana.com"
);
