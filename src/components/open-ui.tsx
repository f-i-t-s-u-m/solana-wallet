"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ArrowLeft,
  CircleXIcon,
  PartyPopperIcon,
  RotateCwIcon,
} from "lucide-react";
import Link from "next/link";

const OpenUi: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  amount: number;
}> = ({ open, setOpen, amount }) => {
  const [loading, setLoading] = useState(false);
  const { wallets, wallet, select, publicKey, signTransaction } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");
  const fibaWalletAddress = new PublicKey(
    "2Rxt86WDda8vaxqYKhbVnDKQuHX7bBMAECNizGBZ3MuC"
  );

  const [step, setStep] = useState<"choose" | "pay" | "success" | "error">(
    "pay"
  );

  const handlePay = async () => {
    if (!wallet || !publicKey || !signTransaction) return;
    setLoading(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: fibaWalletAddress,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const latesBlock = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latesBlock.blockhash;
      transaction.feePayer = publicKey!;
      const signedTransaction = await signTransaction(transaction);
      if (!signedTransaction) throw new Error("Transaction not signed");
      const signature = await connection.sendRawTransaction(
        signedTransaction!.serialize()
      );
      await connection.confirmTransaction(signature);
      setStep("success");
    } catch (error) {
      setStep("error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-h-[70vh]">
          <DialogHeader>
            <DialogTitle>Choose your wallet</DialogTitle>
            <DialogDescription>
              <p>Connect with one of our available wallet</p>
            </DialogDescription>
          </DialogHeader>
          {!wallet ? (
            <div className=" grid grid-cols-3 gap-2">
              {wallets.map((wallet: (typeof wallets)[0]) => (
                <div
                  onClick={() => select(wallet.adapter.name)}
                  key={wallet.adapter.name}
                  className="flex flex-col items-center justify-center hover:bg-neutral-100 bg-black/10 py-3 rounded-md  cursor-pointer"
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    width={44}
                    height={44}
                  />
                  <p>{wallet.adapter.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              {step === "pay" && (
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <div className="flex container mx-auto min-h-[50vh] items-center justify-center ">
                      <div className="size-44 border rounded-full flex items-center justify-center gap-2 ring-2">
                        <span className="text-5xl">{amount} </span>SOL
                      </div>
                    </div>
                    <p>Billing request 1 sol from your wallet</p>
                  </div>
                  <p>Connected to {wallet.adapter.name}</p>
                  <button
                    onClick={handlePay}
                    className="bg-blue-500 text-white px-4 py-2 min-w-56 rounded-md mt-4"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <RotateCwIcon className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              )}
              {step === "success" && (
                <div className="flex flex-col items-center justify-center gap-5">
                  <PartyPopperIcon className=" text-violet-400 w-52 h-52" />
                  <p className="text-sky-500 text-2xl font-bold">
                    Payment Success
                  </p>
                  <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 min-w-56 rounded-md mt-4">
                      Redirect to home
                    </button>
                  </Link>
                </div>
              )}
              {step === "error" && (
                <div className="flex flex-col items-center justify-center gap-5">
                  <CircleXIcon className=" text-red-500 w-44 h-44" />
                  <p className="text-red-500 text-2xl font-bold">
                    Payment failed
                  </p>
                  <button
                    onClick={() => setStep("pay")}
                    className="bg-blue-500 text-white px-4 py-2 min-w-56 rounded-md mt-4"
                  >
                    <ArrowLeft className="inline" /> Try again
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenUi;
