export function initVerboseLog(verbose: boolean) {
  return function (message: string, ...args: any[]) {
    if (verbose) {
      console.log(message, ...args);
    }
  };
}
