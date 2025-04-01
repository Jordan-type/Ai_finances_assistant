import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains";
// import "dotenv/config"
// import { eip712WalletActions } from "viem/zksync"; use it later for zk chains will have it for multiple chains

export function createViemWalletClient() {
    if (!process.env.PRIVATE_KEY) {
        throw new Error("⛔ PRIVATE_KEY environment variable is not set.");
    }

    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

    return createWalletClient({
        account,
        chain: celoAlfajores,
        transport: http(),
    }) // .extend(eip712WalletActions());
}