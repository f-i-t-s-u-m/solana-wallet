"use client";

import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PayAction } from "./action";
import { useWallet } from "@solana/wallet-adapter-react";
import OpenUi from "@/components/open-ui";

const PayUI = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const { publicKey: pkey } = useWallet();
  const [open, setOpen] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
  };
  return (
    <div className="min-h-96 pt-20">
      <div className="flex flex-col max-w-md mx-auto justify-center items-center shadow min-h-80  gap-5 pb-20">
        <div>Request Money</div>

        <div>{status}</div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Amount</label>
          <input
            name="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border  p-2 rounded-md min-w-72"
            placeholder="Write account public address"
          />
        </div>
        <div>
          <button
            className="bg-neutral-800  min-w-52 py-2 rounded-lg text-white"
            onClick={() => setOpen(true)}
          >
            {loading ? "Loading" : "Request Now"}
          </button>
        </div>
      </div>
      <OpenUi open={open} setOpen={setOpen} amount={amount} />
    </div>
  );
};

export default PayUI;
