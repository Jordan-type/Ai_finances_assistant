import { getBalanceTool } from "./getBalance";
import { getTokenBalanceTool } from "./getTokenBalance";
import { getContractAbiTool } from "./getContractAbi";
import { getWalletAddressTool } from "./getWalletAddress";
import { readContractTool } from "./readContract";
import { sendTransactionTool } from "./sendTransaction";
import { deployErc20Tool } from "./deployErc20";
// import { auditTools } from "./smartContractAudit.js";

export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    // read tools
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    get_token_balance: getTokenBalanceTool,
    get_contract_abi: getContractAbiTool,
    read_contract: readContractTool,

    // write tools
    send_transaction: sendTransactionTool,
    deploy_erc20: deployErc20Tool,

    // audit tools
    // ...auditTools,

    // Add more tools here...
};