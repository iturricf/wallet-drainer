# EVM Wallet Drainer

This is a simple tool to drain funds from a compromised EVM wallet, to use in an emergency situation.

## Install

```
$ npm install
```

## Usage

### Simple usage specifying a chain name

```
$ npx wallet-drainer <target_address> <compromised_private_key> --chain=<chain_name>
```

### Load private key from a filepath

```
$ npx wallet-drainer <target_address> --file=<path_to_compromised_private_key> --chain=<chain_name>
```

## Supported chains

- bsc-testnet
- mumbai
- avalanche-fuji
- celo-alfajores
- moonbase-alpha
- optimism-goerli
