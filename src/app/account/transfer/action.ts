"use server";

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const transferSol = async ({
  senderPKey,
  recipientPKey,
  amount,
}: {
  senderPKey: string;
  recipientPKey: string;
  amount: number;
}) => {
  const sender = new PublicKey(senderPKey);
  const recipient = new PublicKey(recipientPKey);

  // const connection = new Connection(clusterApiUrl("devnet"));

  const transaction = new Transaction();

  const sendInstruction = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: LAMPORTS_PER_SOL * amount,
  });

  transaction.add(sendInstruction);

  try {
    // const checkSign = await sendAndConfirmTransaction(connection, transaction, [
    //   sender,
    // ]);

    return {
      status: "ok",
      data: "checkSign",
    };
  } catch (error) {
    return {
      status: "error",
      data: null,
      error,
    };
  }
};
