"use server";

import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

export default async function PingProgramAction({
  programId,
  ProgramDataId,
  payerKey,
  rpcUrl,
}: {
  programId: string;
  ProgramDataId: string;
  payerKey: number[];
  rpcUrl: string;
}) {
  try {
    const pingProgramId = new PublicKey(programId);
    const pingProgramDataId = new PublicKey(ProgramDataId);
    const payer = Keypair.fromSecretKey(new Uint8Array(payerKey));

    const connection = new Connection(rpcUrl, "confirmed");

    const transaction = new Transaction();

    const instruction = new TransactionInstruction({
      programId: pingProgramId,
      keys: [
        {
          pubkey: pingProgramDataId,
          isSigner: false,
          isWritable: true,
        },
      ],
    });

    transaction.add(instruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payer,
    ]);
    return {
      success: true,
      data: {
        signature: signature,
      },
      error: null,
    };
  } catch (error) {
    // console.log("sendTransactionError", sendTransactionError);
    return {
      success: false,
      data: null,
      error: error,
    };
  }
}
