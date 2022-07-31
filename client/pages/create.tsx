import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { MarketContext } from "../context";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DATA_URL } from "../utils";
import { TransactionProgress } from "../components/common";

const options = {
  url: "https://ipfs.infura.io:5001/api/v0",
};

const client = ipfsHttpClient(options);

interface NFTForm {
  price: string;
  name: string;
  description: string;
}

const WalletConnect = () => {
  return (
    <div>
      <h2>Please Connect your wallet</h2>
    </div>
  );
};

const Create = () => {
  const { isConnected, nftContract, marketContract, getListingFee } =
    useContext(MarketContext);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [form, setForm] = useState<NFTForm>({
    price: "",
    name: "",
    description: "",
  });
  const [listingFee, setListingFee] = useState("0");
  const [uploadPercentage, setUploadPercentage] = useState(-1);
  const [txWait, setTxWait] = useState(false);

  const router = useRouter();

  const notify = (message: string) => {
    toast.success(message);
  };

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file || !file.type.match(/image.*/)) {
      toast.error("Please select image file");
      return;
    }
    try {
      const added = await client.add(file, {
        progress: (prog) =>
          setUploadPercentage(Math.floor((prog / file.size) * 100)),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      
      setFileUrl(url);
    } catch (e) {
      console.log("Error uploading file: ", e);
      toast.error(`Error uploading file:`);
    }
  }

  const createItem = async () => {
    const { name, description, price } = form;
    if (!name || !description || !price || !fileUrl) {
      toast.info("All form entries are required");
      return;
    }
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log(`error Create item `, error);
      toast.error("Create item fail.");
    }
  };

  const createSale = async (url: string) => {
    if (!nftContract || !marketContract) return;
    try {
      setTxWait(true);
      let transaction = await nftContract.createToken(url);
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();

      notify(`Transaction 1 of 2 completed`);

      const price = ethers.utils.parseUnits(form.price, "ether");

      transaction = await marketContract.createMarketItem(
        nftContract.address,
        tokenId,
        price,
        { value: listingFee }
      );

      tx = await transaction.wait();

      notify(`Transaction 2 of 2 completed`);
      router.push("/dashboard");
    } catch (error) {
      toast.error("transaction fail");
      setTxWait(false);
    }
  };

  useEffect(() => {
    if (!marketContract) return;
    (async () => {
      const fee = await getListingFee(marketContract);
      setListingFee(fee);
    })();
  }, []);

  return (
    <div className="bg-gradient text-white">
      <Head>
        <title>Create NFt</title>
        <meta name="description" content="NFT Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected ? (
        <div className="mx-auto my-6 flex justify-center items-center">
          <div className="w-[70%]">
            <div className="grid grid-cols-[1fr_300px] gap-24 items-center justify-center">
              <div className="flex flex-col pb-12 text-black">
                <h2 className="text-white text-3xl text-center">Create NFT</h2>
                <input
                  placeholder="Asset Name"
                  className="mt-8 border rounded p-4"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <textarea
                  placeholder="Asset description"
                  className="mt-2 border rounded p-4"
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <input
                  placeholder="Asset Price in Eth"
                  className="mt-8 border rounded p-4"
                  type="number"
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                  type="file"
                  name="Asset"
                  className="my-4"
                  onChange={onChange}
                />
                {!txWait ? (
                  <button
                    onClick={createItem}
                    className="font-bold mt-4 bg-gradient-to-r from-[#1199fa] to-[#11d0fa]  rounded-md text-white  p-4 shadow-lg"
                  >
                    Create NFT
                  </button>
                ) : (
                   <TransactionProgress />
                )}

                <h5 className="text-white mt-4">
                  * Listing Price: {ethers.utils.formatEther(listingFee)} eth
                </h5>
              </div>
              {fileUrl ? (
                <div className="w-[300px] h-[300px]">
                  <Image
                    src={fileUrl}
                    unoptimized
                    alt="Picture of the author"
                    className="rounded mt-4"
                    layout="responsive"
                    width={300}
                    height={300}
                    placeholder={"blur"}
                    blurDataURL={DATA_URL}
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center w-[300px] h-[300px] rounded-md border-2 border-blue-500">
                    <h4 className="text-2xl">Not Image</h4>
                  </div>
                  {uploadPercentage > -1 && (
                    <p className="py-3 text-center">
                      {uploadPercentage} % uploaded
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <WalletConnect />
      )}
    </div>
  );
};

export default Create;
