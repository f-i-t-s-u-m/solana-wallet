"use client";

import React, { useState } from "react";
import PingProgramAction from "./action";
import { useAtomValue } from "jotai";
import { rpcUrlAtom } from "@/lib/atom";

const PingProgram: React.FC = () => {
  const rpcUrl = useAtomValue(rpcUrlAtom);
  const [programDataAddress, setProgramDataAddress] = useState(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
  );
  const [programId, setProgramId] = useState(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
  );
  const [status, setStatus] = useState("");
  const [payer, setPayer] = useState("[0, 0, 0]");

  const handleSearch = async () => {
    setStatus(
      `Searching for program with ID: ${programId} at address: ${programDataAddress}`
    );

    const resp = await PingProgramAction({
      ProgramDataId: programDataAddress,
      programId,
      payerKey: JSON.parse(payer),
      rpcUrl,
    });

    if (resp.error) {
      setStatus(`${resp.error}`);
    } else {
      setStatus(`Program found, Signature: ${resp.data?.signature}`);
    }
  };

  return (
    <div className="container max-w-lg mx-auto my-8 p-4 space-y-5 bg-white/10 shadow-md rounded">
      <h1>Ping a Program</h1>
      <div className="flex gap-2 flex-col">
        <label>Program Data Address:</label>
        <input
          className="p-2 rounded-lg mx-1 border"
          type="text"
          value={programDataAddress}
          onChange={(e) => setProgramDataAddress(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <label>Program ID:</label>
        <input
          className="p-2 rounded-lg mx-1 border"
          type="text"
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-col">
        <label>Sender:</label>
        <input
          className="p-2 rounded-lg mx-1 border"
          type="text"
          value={payer as unknown as string}
          onChange={(e) => setPayer(e.target.value)}
          placeholder=" Paste your wallet private key here"
        />
      </div>
      <button
        className="  px-5 text-white rounded-lg py-2 *:hover:bg-white/20 bg-sky-500 w-full "
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="">
        <div className="">{status}</div>
      </div>
    </div>
  );
};

export default PingProgram;
