# Build your own decentralized exchange like Uniswap v1

This sample project is based on [https://learnweb3.io/degrees/ethereum-developer-degree/sophomore/build-your-own-decentralized-exchange-like-uniswap-v1/ ](https://learnweb3.io/degrees/ethereum-developer-degree/sophomore/build-your-own-decentralized-exchange-like-uniswap-v1/)

## Requirements

Build an exchange that allows swapping ETH <> TOKEN.

DEX must charge a 1% fee on swaps.

When user adds liquidity, they must be given an LP Token that represents their share of the pool.

LP must be able to burn their LP tokens to receive back ETH and TOKEN.

## Quick start

Local
```
npx hardhat node
npx hardhat test --network localhost 
```

## Play
You can play with the smart contracts deployed in Sepolia:

[contracts/Token3io.sol:Token3io at 0xace1756E5F214a99CBF46825E40F7fB39f1dA6D7](https://sepolia.etherscan.io/address/0xace1756E5F214a99CBF46825E40F7fB39f1dA6D7)
[contracts/Exchange.sol:Exchange at 0xCDF6Eb224d7a7fBCe22f4439e5c87E75C3710050](https://sepolia.etherscan.io/address/0xCDF6Eb224d7a7fBCe22f4439e5c87E75C3710050)

## Personal addition

Testing test\test.js

# Things

Using hardhat console.log funcionality into SmartContracts and hardhat node
