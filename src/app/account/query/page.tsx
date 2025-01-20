"use client";

import { useState } from "react";
import { checkBalance } from "./action";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const QueryPage = () => {
  const [loading, setLoading] = useState(false);
  const [pkey, setPkey] = useState("");
  const [status, setStatus] = useState("");
  const handleQuery = async () => {
    if (!pkey.length) return;
    setLoading(true);
    const res = await checkBalance(pkey);
    if (res.status === "error") {
      setStatus(`${res.error}`);
      setLoading(false);
      return;
    }
    setStatus(
      `account balance: ${(
        res.data?.balance ?? 0 / LAMPORTS_PER_SOL
      ).toFixed()}`
    );
    setLoading(false);
  };
  return (
    <div className="min-h-96 pt-20">
      <div className="flex flex-col max-w-md mx-auto justify-center items-center shadow min-h-80  gap-5 pb-20">
        <div>Query other account</div>

        <div>{status}</div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Public Address</label>
          <input
            name="address"
            value={pkey}
            onChange={(e) => setPkey(e.target.value)}
            className="border  p-2 rounded-md min-w-72"
            placeholder="Write account public address"
          />
        </div>
        <div>
          <button
            className="bg-neutral-800  min-w-52 py-2 rounded-lg text-white"
            onClick={handleQuery}
          >
            {loading ? "Loading..." : "Query"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
