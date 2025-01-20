"use client";

import { rpcUrlAtom } from "@/lib/atom";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAtomValue } from "jotai";
import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";

const AccountPage: NextPage = () => {
  const rpcUrl = useAtomValue(rpcUrlAtom);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const connection = useMemo(() => new Connection(rpcUrl), [rpcUrl]);
  const { publicKey } = useWallet();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicKey || !connection) {
        setError("Connection or public key not available");
        return;
      }

      try {
        connection.onAccountChange(
          publicKey,
          (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          },
          "confirmed"
        );

        const accountInfo = await connection.getAccountInfo(publicKey);
        console.log(accountInfo, "accountInfo");

        if (accountInfo === null) {
          setError("Account not found");
          return;
        }

        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        setError(null);
      } catch (error) {
        setError(error as string);
      }
    };
    getBalance();
  }, [connection, publicKey]);

  if (error) {
    return (
      <div className="flex container mx-auto min-h-[50vh] items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  } else if (!publicKey) {
    return (
      <div className="flex container mx-auto min-h-[50vh] items-center justify-center">
        <div className="text-red-500">Wallet not connected</div>
      </div>
    );
  }

  return (
    <div className="flex container mx-auto min-h-[50vh] items-center justify-center ">
      <div className="size-52 border rounded-full flex items-center justify-center gap-2 ring-2">
        <span className="text-5xl">{balance.toFixed(1)} </span>SOL
      </div>
    </div>
  );
};

export default AccountPage;
