import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButton: React.FC<{ wallets: any }> = ({ wallets }) => {
  const { connect, connecting, connected } = useWallet();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-gray-900  bg-white hover:bg-gray-100 border min-w-32 border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-device-ipad mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-3 16h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
          </svg>
          {connecting
            ? "Connecting"
            : connected
            ? "Connected"
            : "Connect Wallet"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-10 backdrop-blur-sm min-w-72 mr-3">
        <DropdownMenuLabel>Wallets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className=" grid grid-cols-3 gap-2">
          {wallets.map((wallet: any) => (
            <DropdownMenuItem
              key={wallet.name}
              className="hover:bg-neutral-100 rounded-md  cursor-pointer"
              onClick={() => connect(wallet.name)}
            >
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={24}
                height={24}
              />{" "}
              {wallet.name}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletMultiButton;
