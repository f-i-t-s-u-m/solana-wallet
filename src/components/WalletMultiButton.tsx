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
import { WalletIcon } from "@solana/wallet-adapter-react-ui";

const WalletMultiButton: React.FC = () => {
  const {
    select,
    wallets,
    wallet,
    connecting,
    connected,
    disconnect,
    publicKey,
  } = useWallet();

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-gray-900 py-1.5  bg-white hover:bg-gray-100 border min-w-32 border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5  text-center flex justify-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 "
        >
          {wallet ? (
            <WalletIcon
              className="size-7 mr-3"
              wallet={{
                adapter: {
                  icon: wallet?.adapter.icon,
                  name: wallet?.adapter.name,
                },
              }}
            />
          ) : (
            <>
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
            </>
          )}
          <span className="font-bold">
            {connecting
              ? "Connecting"
              : connected
              ? wallet?.adapter.name
              : "Connect Wallet"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-10 backdrop-blur-sm min-w-72 mr-3">
        <DropdownMenuLabel className=" max-w-56 line-clamp-2 ">
          Wallets: {publicKey?.toBase58()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {connected ? (
          <>
            <DropdownMenuItem className=" cursor-pointer" onClick={handleCopy}>
              Copy Public address
            </DropdownMenuItem>
            <DropdownMenuItem>other</DropdownMenuItem>
            <DropdownMenuItem>
              <button
                type="button"
                className="text-gray-900 w-full bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </DropdownMenuItem>
          </>
        ) : (
          <div className=" grid grid-cols-3 gap-2">
            {wallets.map((wallet: (typeof wallets)[0]) => (
              <DropdownMenuItem
                key={wallet.adapter.name}
                className="hover:bg-neutral-100 rounded-md  cursor-pointer"
                onClick={() => select(wallet.adapter.name)}
              >
                <Image
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  width={24}
                  height={24}
                />{" "}
                {wallet.adapter.name}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletMultiButton;
