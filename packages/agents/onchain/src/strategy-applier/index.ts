// // packages/agents/onchain/src/strategy-applier/index.ts

// import { AgentKit, walletActionProvider, erc20ActionProvider } from "@coinbase/agentkit";
// import { FundStrategy } from "../../types/type"; // You can define this cleanly
// import { config } from "../config";

// // 🛒 Helper: Token Addresses (Example — customize later)
// const TOKEN_ADDRESSES = {
//   WBTC: "0x...",   // WBTC address on your chain (Base, Sepolia etc.)
//   USDC: "0x...",   // Stablecoin address
//   AAVE: "0x...",   // DeFi Token example
// };

// export async function applyFundStrategy(strategy: FundStrategy, agentkit: AgentKit) {
//   const wallet = await agentkit.getWallet();

//   const walletActions = walletActionProvider();
//   const erc20Actions = erc20ActionProvider();

//   const defaultAddress = await wallet.getDefaultAddress();

//   // Fetch available balance (assume starting with ETH or USDC)
//   const totalBalance = await walletActions.getNativeBalance(defaultAddress);

//   if (!totalBalance || Number(totalBalance) <= 0) {
//     throw new Error("Wallet has insufficient funds to apply strategy.");
//   }

//   console.log("✅ Starting balance:", totalBalance);

//   // Calculate target amounts
//   const btcAmount = (Number(totalBalance) * (strategy.allocations.BTC.percentage / 100));
//   const stableAmount = (Number(totalBalance) * (strategy.allocations.Stablecoins.percentage / 100));
//   const defiAmount = (Number(totalBalance) * (strategy.allocations.DeFiTokens.percentage / 100));

//   console.log("📊 Allocations calculated:", { btcAmount, stableAmount, defiAmount });

//   // Here you would normally SWAP — but for now, let's simulate "send" actions

//   // Step 1. Allocate to WBTC
//   if (btcAmount > 0) {
//     await erc20Actions.sendToken({
//       wallet,
//       tokenAddress: TOKEN_ADDRESSES.WBTC,
//       toAddress: defaultAddress,
//       amount: btcAmount.toString(), 
//     });
//     console.log(`🚀 Allocated ${btcAmount} to WBTC`);
//   }

//   // Step 2. Keep Stablecoins (assumed held, or optionally send to self)

//   // Step 3. Allocate to DeFi Tokens (AAVE Example)
//   if (defiAmount > 0) {
//     await erc20Actions.sendToken({
//       wallet,
//       tokenAddress: TOKEN_ADDRESSES.AAVE,
//       toAddress: defaultAddress,
//       amount: defiAmount.toString(),
//     });
//     console.log(`🚀 Allocated ${defiAmount} to DeFi tokens (AAVE)`);
//   }

//   return {
//     success: true,
//     message: "Fund strategy successfully applied!",
//     allocations: {
//       BTC: btcAmount,
//       Stablecoins: stableAmount,
//       DeFiTokens: defiAmount,
//     },
//   };
// }
