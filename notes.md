# JordanVerse AI Assistant - Project Notes

## Overview

This project implements an AI-powered blockchain assistant that can interact with the Celo Alfajores testnet. The system consists of a backend server that handles OpenAI API interactions and blockchain operations, and a frontend interface for user interactions.

## Architecture

### Backend (Node.js/Express + TypeScript)

The backend is built with Express.js and TypeScript, providing a RESTful API that serves as a bridge between the frontend and various blockchain services.

#### Key Components:

1. **OpenAI Integration**
   - Uses OpenAI's Assistant API to create a specialized AI assistant
   - Maintains a persistent thread for conversation context
   - Handles message processing and response generation

2. **Blockchain Tools**
   - Implements various blockchain interaction tools using Viem
   - Supports operations like:
     - Getting wallet balances
     - Deploying ERC20 tokens
     - Reading contract data
     - Sending transactions

3. **API Endpoints**
   - `/openai/chatCompletion`: Handles chat interactions with the AI assistant
   - Processes user messages and returns AI responses

4. **Blockchain Configuration**
   - Uses Celo Alfajores testnet
   - Configured with Viem for blockchain interactions
   - Supports both read and write operations

### Frontend (React + TypeScript)

The frontend provides a user-friendly interface for interacting with the AI assistant and blockchain.

#### Key Components:

1. **Chat Interface**
   - Real-time messaging with the AI assistant
   - Message history display
   - Input handling for user queries

2. **Blockchain Integration**
   - Wallet connection functionality
   - Transaction status display
   - Balance checking capabilities

3. **UI Components**
   - Modern, responsive design
   - Loading states and error handling
   - Transaction confirmation displays

## Data Flow

1. User sends a message through the frontend
2. Frontend makes a POST request to `/openai/chatCompletion`
3. Backend processes the message:
   - Adds it to the OpenAI thread
   - Creates and performs a run
   - Processes any tool calls (blockchain operations)
   - Returns the response to the frontend
4. Frontend displays the response to the user

## Blockchain Tools

The system includes several blockchain interaction tools:

1. **get_balance**: Retrieves the native token balance of a wallet
2. **get_token_balance**: Checks ERC20 token balances
3. **deploy_erc20**: Deploys new ERC20 token contracts
4. **send_transaction**: Sends transactions on the blockchain
5. **read_contract**: Reads data from smart contracts

## Development Setup

1. **Backend Setup**
   - Node.js environment
   - TypeScript configuration
   - Environment variables for API keys
   - Viem for blockchain interactions

2. **Frontend Setup**
   - React with TypeScript
   - API integration with the backend
   - Web3 provider configuration

## Deployment Considerations

- Backend requires environment variables for OpenAI API key
- Frontend needs to be configured with the correct backend API URL
- Blockchain interactions require proper network configuration
- Error handling and logging should be implemented for production

## Future Enhancements

- Additional blockchain tools for more complex operations
- Enhanced error handling and recovery
- Improved UI/UX for blockchain interactions
- Support for additional blockchain networks
- Advanced AI capabilities for blockchain analysis 