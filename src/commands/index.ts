import { ethers } from "ethers";
import { getDrainTxOverrides } from "./gasEstimator";
import { ChainInfo } from "../config/chains";

export async function transferNativeAssets(
  toAddress: string,
  privateKey: string,
  chainInfo: ChainInfo
): Promise<void> {
  const wallet = getWalletForChain(chainInfo, privateKey);
  // build tx
  // TODO: improve to handle tokens
  const gasLimit = 21000;
  console.time("overrides");
  const overrides = await getDrainTxOverrides(chainInfo, wallet, gasLimit);
  if (!overrides) {
    throw new Error("Invalid overrides");
  }
  console.timeEnd("overrides");
  const tx = {
    to: toAddress,
    gasLimit,
    ...overrides,
  };

  // TODO: do not send if value is less than 0
  const transferAmount = ethers.utils.formatEther(tx.value);
  console.debug(
    `sending ${transferAmount} ETH from ${(
      await wallet.getAddress()
    ).toString()} to ${toAddress}`
  );
  // send tx
  // console.log("We've got a tx", tx);
  // console.time("send_tx");
  // const txReceipt = await wallet.sendTransaction(tx);
  // console.timeEnd("send_tx");

  // console.log(
  //   `Sent ${transferAmount} ETH to ${toAddress} with txHash ${txReceipt.hash}`
  // );
}

export function getWalletForChain(chainInfo: ChainInfo, privateKey: string) {
  const rpc = chainInfo.rpc;
  if (!rpc) {
    throw new Error(`Invalid RPC for chain ${chainInfo.name}: ${rpc}`);
  }
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(privateKey, provider);
  return wallet;
}
