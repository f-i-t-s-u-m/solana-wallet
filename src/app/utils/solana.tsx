import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const slot = await connection.getSlot();

const block = await connection.getBlockTime(slot);

console.log(block, "block");

const slotLeader = await connection.getSlotLeader();

console.log(slotLeader, "slotLeader");
