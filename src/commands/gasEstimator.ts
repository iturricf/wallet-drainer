import { Wallet, ethers } from "ethers";
import { ChainInfo } from "../config/chains";

// TODO: handle legacy gas model
export async function getDrainTxOverrides(
  chainInfo: ChainInfo,
  wallet: Wallet,
  gasLimit: number
) {
  if (chainInfo.legacyGasModel) {
    return legacyGasModelOverrides(wallet, gasLimit);
  } else {
    return eip1559GasModelOverrides(wallet, gasLimit);
  }
}

async function legacyGasModelOverrides(wallet: Wallet, gasLimit: number) {
  throw new Error("Legacy gas model not implemented");
}

async function eip1559GasModelOverrides(wallet: Wallet, gasLimit: number) {
  try {
    console.time("promise_all");
    // TODO: fail on balance 0
    const [balance, nonce, feeData] = await Promise.all([
      wallet.getBalance(),
      getWalletNonce(wallet),
      wallet.getFeeData(),
    ]);
    console.timeEnd("promise_all");

    // TODO: handle 0 value
    const estimatedGasPrice =
      feeData.lastBaseFeePerGas?.add(feeData.maxPriorityFeePerGas || 0) ||
      ethers.BigNumber.from(0);

    const totalTxCost = estimatedGasPrice.mul(gasLimit);

    console.debug(
      "max fee per gas:",
      ethers.utils.formatEther(estimatedGasPrice)
    );
    console.debug(
      "max priority Fee per gas:",
      ethers.utils.formatEther(feeData.maxPriorityFeePerGas!)
    );
    console.debug("total tx cost:", ethers.utils.formatEther(totalTxCost));

    return {
      type: 2,
      value: balance.sub(totalTxCost),
      nonce,
      maxFeePerGas: estimatedGasPrice,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas!,
    };
  } catch (error: unknown) {
    console.error("Error while fetching data from provider:", error);
    process.exit(1);
  }
}

async function getWalletNonce(wallet: Wallet) {
  return await wallet.getTransactionCount();
}
