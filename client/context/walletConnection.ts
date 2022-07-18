export const isWalletConnectedHandler = async (): Promise<
  string | undefined
> => {
  try {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      return accounts[0];
    } else {
      console.log("No accounts found");
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const connectWalletHandler = async (): Promise<string | undefined> => {
  try {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.log(error);
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    return undefined;
  }
};
