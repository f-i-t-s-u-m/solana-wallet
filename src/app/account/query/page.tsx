import { NextPage } from "next";
import React from "react";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const SendPage: NextPage = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = new PublicKey("2Rxt86WDda8vaxqYKhbVnDKQuHX7bBMAECNizGBZ3MuC");

  const balance = await connection.getBalance(wallet);

  return <div>page, {balance / LAMPORTS_PER_SOL}</div>;
};

export default SendPage;
