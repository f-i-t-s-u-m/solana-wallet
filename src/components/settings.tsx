"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="border  p-1.5 rounded-lg">
          <SettingsIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-20 bg-white mr-4 min-w-72 p-5 text-sm">
        <DropdownMenuLabel>Network setting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start">
          <label htmlFor="network">RPC endpoint URL</label>
          <input
            name="network"
            className="mr-2 w-full  *:mr-0 border rounded-md p-2"
            placeholder="solana rpc url"
            value={"https://api.devnet.solana.com"}
          />
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start">
          <label htmlFor="network">Commitment</label>
          <select
            name="network"
            className="mr-2 w-full  *:mr-0 border rounded-md p-2"
          >
            <option value="confirmed">Confirmed</option>
            <option value="finalized">Finalized</option>
          </select>
        </div>
        <div>
          <button className="bg-blue-500 text-white p-2 mt-5 w-full rounded-md">
            Save
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
