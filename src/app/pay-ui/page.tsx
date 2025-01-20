"use client";

import { useState } from "react";
import OpenUi from "@/components/open-ui";

const PayUI = () => {
  const [amount, setAmount] = useState(0);
  const [status] = useState("");
  const [open, setOpen] = useState(false);

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
            onChange={(e) => setAmount(e.target.value as unknown as number)}
            className="border  p-2 rounded-md min-w-72"
            placeholder="Amount to request"
          />
        </div>
        <div>
          <button
            className="bg-neutral-800  min-w-52 py-2 rounded-lg text-white"
            onClick={() => setOpen(true)}
          >
            Request Now
          </button>
        </div>
      </div>
      <OpenUi open={open} setOpen={setOpen} amount={amount} />
    </div>
  );
};

export default PayUI;
