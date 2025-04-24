import "dotenv/config"

export const config = {
  openaiKey: process.env.OPENAI_API_KEY ?? "",
  cdpApiKeyName: process.env.CDP_API_KEY_NAME ?? "", 
  cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY ?? "",
  networkId: process.env.NETWORK_ID ?? "base-sepolia",
  openseaApiKey: process.env.OPENSEA_API_KEY ?? "", // optional
  githubToken: process.env.GITHUB_TOKEN ?? "",
};

export function validateConfig() {
  const missing = [];

  if (!config.openaiKey) missing.push("OPENAI_API_KEY");
  if (!config.cdpApiKeyName) missing.push("CDP_API_KEY_NAME");
  if (!config.cdpApiKeyPrivateKey) missing.push("CDP_API_KEY_PRIVATE_KEY");

  if (missing.length) {
    console.error("❌ Missing environment variables:", missing.join(", "));
    process.exit(1);
  }
}
