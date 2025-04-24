import { createPublicClient, http } from 'viem'
import { celoAlfajores } from 'viem/chains'

export function createViemPublicClient() {
    return createPublicClient({
        chain: celoAlfajores,
        transport: http(),
    });
}