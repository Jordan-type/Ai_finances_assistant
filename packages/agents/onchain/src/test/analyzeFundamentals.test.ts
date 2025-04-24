import { analyzeFundamentals } from "../fundamental/index";

const runTest = async () => {
  const testInputs = {
    repoUrl: "https://github.com/Uniswap/v3-core",
    tokenomicsSummary: `
    The token has a total supply of 1 billion tokens. 40% to team and advisors (3-year vesting),
    30% to investors (2-year vesting), 20% to ecosystem rewards (ongoing), and 10% to foundation treasury.
    Deflationary mechanics include periodic burns and capped inflation.
    `,
    governanceDoc: `
    The DAO governance forum is active with weekly proposals and snapshot voting. 
    Audits by Certik and Trail of Bits. Participation rate is 65% on average.
    `
  };

  const result = await analyzeFundamentals(testInputs);
  console.log("📊 Final Fundamental Analysis Result:");
  console.log(JSON.stringify(result, null, 2));
};

runTest();