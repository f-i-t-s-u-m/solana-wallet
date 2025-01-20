"use client";

import { useState } from "react";

const Transfer = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [status] = useState();
  const [amount, setAmount] = useState(0);

  const sendSol = () => {
    // await transferSol({
    // })
  };
  return (
    <div>
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
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
          </div>
          <button
            onClick={sendSol}
            className="border p-2 rounded-md bg-neutral-600 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
