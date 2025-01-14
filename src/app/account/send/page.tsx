"use client";

import React, { useState } from "react";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

const SendSol = () => {
  const [recipientAddress, setRecipientAddress] = useState(
    "vAasNXD7iTYNMHmeh3973i2nEk2TCVv4C6EcATGGYLn"
  );
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const wallet = useWallet();

  const sendSol = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setStatus("Wallet not connected");
      throw new WalletNotConnectedError();
    }

    const connection = new Connection(clusterApiUrl("devnet")); // or 'https://api.devnet.solana.com'
    const recipient = new PublicKey(recipientAddress);
    const lamports = LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipient,
        lamports,
      })
    );

    try {
      setStatus("Sending...");
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "processed");

      setStatus(`Transaction successful! Signature: ${signature}`);
    } catch (error) {
      // console.error(error);
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-center pt-20 text-lg font-bold">Send SOL</h1>
      <p className="text-center pt-2 text-md">{status}</p>
      <div className="flex flex-col justify-center gap-5 max-w-md mx-auto h-[50vh]">
        <div className="flex flex-col gap-2">
          <label>Recipient Address</label>
          <input
            type="text"
            placeholder="Recipient Address"
            className="p-2 border min-w-96 rounded-md text-neutral-600"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Amount (SOL)"
            className="p-2 border min-w-96 rounded-md text-neutral-600"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={sendSol}
          disabled={!wallet.connected}
          className="border p-2 rounded-md bg-neutral-600 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendSol;
