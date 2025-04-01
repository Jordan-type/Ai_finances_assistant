import { Address, Hash } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface WriteContractArgs {
    address: Address;
    abi: any[];
    functionName: string;
    args?: any[];
}

export const writeContractTool: ToolConfig<WriteContractArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'write_contract',
            description: 'Execute a write operation on a smart contract',
            parameters: {
                type: 'object',
                properties: {
                    address: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The contract address to interact with',
                    },
                    abi: {
                        type: 'array',
                        description: 'Contract ABI (Application Binary Interface)',
                        items: {
                            type: 'object',
                            properties: {
                                type: { type: 'string' },
                                name: { type: 'string' },
                                inputs: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            type: { type: 'string' }
                                        }
                                    }
                                },
                                outputs: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' },
                                            type: { type: 'string' }
                                        }
                                    }
                                },
                                stateMutability: { type: 'string' }
                            }
                        }
                    },
                    functionName: {
                        type: 'string',
                        description: 'The name of the function to call',
                    },
                    args: {
                        type: 'array',
                        description: 'The arguments to pass to the function (optional)',
                        items: {
                            type: 'string',
                            description: 'Function argument value (can be any type, but must be passed as a string)'
                        },
                        optional: true
                    }
                },
                required: ['address', 'abi', 'functionName']
            }
        }
    },
    handler: async ({ address, abi, functionName, args = [] }) => {
        return await writeContract({ address, abi, functionName, args });
    }
};

export async function writeContract({
    address,
    abi,
    functionName,
    args
}: WriteContractArgs): Promise<Hash> {
    const walletClient = createViemWalletClient();
    const hash = await walletClient.writeContract({
        address,
        abi,
        functionName,
        args: args ?? [],
    });
    return hash;
}