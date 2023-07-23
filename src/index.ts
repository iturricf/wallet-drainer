import { transferNativeAssets } from "./commands";
import { getChainByName } from "./config/chains";
import { initVerboseLog } from "./logs";
import { configureYargs } from "./options";
import { readPkFromFile } from "./utils";

const argv = configureYargs();

export async function drainWallet(argv: any) {
  const recv_address = argv.emergency_address as string;
  const compromised_pk = argv.private_key as string;
  const chain = argv.chain as string;
  const tokens = argv.tokens as boolean;
  const file = argv.file as string;
  const custom_rpc = argv.rpc as string;
  const verbose = argv.verbose as boolean;

  console.debug = initVerboseLog(verbose);

  if (!compromised_pk && !file) {
    throw new Error("Invalid pk");
  }

  try {
    const privateKey = compromised_pk || (await readPkFromFile(file));
    const chainInfo = getChainByName(chain);
    await transferNativeAssets(recv_address, privateKey, chainInfo);
  } catch (e: any) {
    console.debug(e);
    console.error(
      `Error while transfering value to: ${recv_address}.`,
      e.message
    );
  }
}

drainWallet(argv);
