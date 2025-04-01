import { Address, parseEther, AccessList } from 'viem'
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface SendTransactionArgs {
    to: Address;
    value?: string;
    data?: `0x${string}`;
    nonce?: number;
    gasPrice?: string;
    accessList?: AccessList;
    factoryDeps?: `0x${string}`[];
    paymaster?: Address;
    paymasterInput?: `0x${string}`;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send a transaction with optional parameters',
            parameters: {
                type: 'object',
                properties: {
                    to: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address',
                    },
                    value: {
                        type: 'string',
                        description: 'The amount of ETH to send (in ETH, not Wei)',
                        optional: true,
                    },
                    data: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]*$',
                        description: 'Contract interaction data',
                        optional: true,
                    },
                    nonce: {
                        type: 'number',
                        description: 'Unique number identifying this transaction',
                        optional: true,
                    },
                    gasPrice: {
                        type: 'string',
                        description: 'Gas price in Gwei',
                        optional: true,
                    },
                    accessList: {
                        type: 'array',
                        description: 'EIP-2930 access list',
                        items: {
                            type: 'object',
                            properties: {
                                address: {
                                    type: 'string',
                                    description: 'The address of the account or contract to access'
                                },
                                storageKeys: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        description: 'The storage keys to access'
                                    }
                                }
                            },
                            required: ['address', 'storageKeys']
                        },
                        optional: true,
                    },
                    factoryDeps: {
                        type: 'array',
                        description: 'Factory dependencies (bytecodes of smart contracts)',
                        items: {
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]*$',
                            description: 'Contract bytecode as hex string'
                        },
                        optional: true,
                    },
                    paymaster: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'Paymaster address',
                        optional: true,
                    },
                    paymasterInput: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]*$',
                        description: 'Paymaster input',
                        optional: true,
                    }
                },
                required: ['to']
            }
        }
    },
    handler: async (args) => {
        const result = await sendTransaction(args);
        if (!result.success || !result.hash) throw new Error(result.message);
        return result.hash;
    }
};

async function sendTransaction({
    to,
    value,
    data,
    nonce,
    gasPrice,
    accessList,
    factoryDeps,
    paymaster,
    paymasterInput
}: SendTransactionArgs) {
    try {
        const walletClient = createViemWalletClient();

        const hash = await walletClient.sendTransaction({
            to,
            value: value ? parseEther(value) : undefined,
            data,
            nonce: nonce || undefined,
            gasPrice: gasPrice ? parseEther(gasPrice) : undefined,
            accessList: accessList || undefined,
            customData: {
                factoryDeps: factoryDeps || undefined,
                paymaster: paymaster || undefined,
                paymasterInput: paymasterInput || undefined
            }
        })

        return {
            success: true,
            hash,
            message: `Transaction sent successfully. Hash: ${hash}`
        }
    } catch (error) {
        return {
            success: false,
            hash: null,
            message: `Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}