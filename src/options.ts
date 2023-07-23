import yargs from "yargs";

export function configureYargs() {
  return yargs
    .scriptName("edrain-wallet") // Specify the script name as the unique command
    .command(
      "$0 <emergency_address> [private_key] [options]",
      "EVM Emergency wallet drainer",
      (yargs) => {
        yargs
          .positional("emergency_address", {
            type: "string",
            describe: "The address you want to drain funds to",
          })
          .positional("private_key", {
            type: "string",
            describe: "Your wallet private key",
            default: "",
          })
          .option("file", {
            alias: "f",
            type: "string",
            default: "",
            describe:
              "Path to a file containing your private key, if you don't want to pass it as an argument",
          })
          .option("chain", {
            alias: "c",
            type: "string",
            default: "ethereum",
            describe:
              "Specify the chain where you want to drain your funds. Default: ethereum",
          })
          .option("tokens", {
            alias: "t",
            type: "boolean",
            default: false,
            describe: "Whether to drain other tokens different from native gas",
          })
          .option("rpc", {
            alias: "r",
            type: "string",
            default: "",
            describe: "Custom RPC endpoint to use for all chains",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            default: false,
            describe: "Run with verbose logging",
          });
      }
    )
    .help().argv; // Enable help option // Parse the command-line arguments
}
