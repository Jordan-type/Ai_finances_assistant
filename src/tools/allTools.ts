import { getBalanceTool } from "./getBalance.js";
import { getTokenBalanceTool } from "./getTokenBalance.js";
import { getContractAbiTool } from "./getContractAbi.js";
import { getWalletAddressTool } from "./getWalletAddress.js";
import { readContractTool } from "./readContract.js";
import { sendTransactionTool } from "./sendTransaction.js";
import { deployErc20Tool } from "./deployErc20.js";




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

    // Add more tools here...
};