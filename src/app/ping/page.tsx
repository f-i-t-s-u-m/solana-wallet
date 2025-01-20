"use client";

import React, { useState } from "react";
import PingProgramAction from "./action";

const PingProgram: React.FC = () => {
  const [programDataAddress, setProgramDataAddress] = useState(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
  );
  const [programId, setProgramId] = useState(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
  );
  const [status, setStatus] = useState("");
  const [payer, setPayer] = useState<number[]>([0]);

  const handleSearch = async () => {
    setStatus(
      `Searching for program with ID: ${programId} at address: ${programDataAddress}`
    );

    const resp = await PingProgramAction({
      ProgramDataId: programDataAddress,
      programId,
      payerKey: payer as unknown as number[],
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
          onChange={(e) => setPayer(JSON.parse(e.target.value))}
        />
      </div>
      <button
        className=" bg-white/10 px-5 w-52 rounded-lg py-2"
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
