"use server";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const checkBalance = async (address: string) => {
  try {
    const publicKey = new PublicKey(address);
    const connection = new Connection(clusterApiUrl("devnet"));
    const balance = await connection.getBalance(publicKey);
    return {
      status: "ok",
      data: { balance },
    };
  } catch (error) {
    return {
      status: "error",
      error: error,
      data: null,
    };
  }
};
