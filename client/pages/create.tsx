import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { MarketContext } from "../context";
import { NFTStorage, File } from "nft.storage";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DATA_URL } from "../utils";
import { TransactionProgress } from "../components/common";
import { UploadIcon } from "@heroicons/react/solid";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_VERCEL_NFT_STORAGE_TOKEN!,
});
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
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);  
  const [txWait, setTxWait] = useState(false);

  const fileInput  = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const triggerOnChange = () => {
    if(!fileInput.current) return;
    fileInput.current.click();
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const { name, description } = form;
    if (!name || !description) {
      toast.info("name and description required");
      return;
    }
    const file = e.target.files[0];
    if (!file || !file.type.match(/image.*/)) {
      toast.error("Please select image file");
      return;
    }
    try {
      setUploading(true)
      const imageFile = new File([file], `${file.name}.${file.type}`, {
        type: `image/${file.type}`,
      });
      const metadata = await client.store({
        name,
        description,
        image: imageFile,
      });
      setFileUrl(metadata.url);
      setImageUrl(metadata.data.image.href);
      setUploading(false);
    } catch (e) {
      console.log("Error uploading file: ", e);
      toast.error(`Error uploading file:`);
      setUploading(false);
    }
  }

  const createItem = async () => {
    const { name, description, price } = form;
    if (!name || !description || !price || !fileUrl) {
      toast.info("All form entries are required");
      return;
    }

    try {
      createSale();
    } catch (error) {
      console.log(`error Create item `, error);
      toast.error("Create item fail.");
    }
  };

  const createSale = async () => {
    if (!nftContract || !marketContract) return;
    let toastTx = toast.loading("Please wait...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    try {
      setTxWait(true);
      let transaction = await nftContract.createToken(fileUrl);

      let tx = await transaction.wait();
      toast.update(toastTx, {
        render: "Tx Ok",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      let event = tx.events[0];
      console.log("EVENT", event);
      let value = event.args[2];
      console.log("VALUE", value);

      let tokenId = value.toNumber();
      console.log("TOKEN-ID", tokenId);

      const price = ethers.utils.parseUnits(form.price, "ether");
      toastTx = toast.loading("Please wait...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      transaction = await marketContract.createMarketItem(
        nftContract.address,
        tokenId,
        price,
        { value: listingFee }
      );

      tx = await transaction.wait();
      toast.update(toastTx, {
        render: "Tx Ok",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      router.push("/dashboard");
    } catch (error) {
      toast.update(toastTx, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
                  className="hidden"
                  ref={fileInput}
                  onChange={onChange}
                />
                { (!imageUrl || uploading ) && (
                  <div className="my-4">
                    <button className="p-2 bg-gradient-to-tr from-rose-400 to-rose-600 text-white rounded-md flex flex-row justify-between items-center" onClick={triggerOnChange}>
                      <UploadIcon className="fill-white w-5 h-5"/>
                      <span>Upload Image</span>
                    </button>
                  </div>
                )}
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
              {imageUrl ? (
                <div className="w-[300px] h-[300px]">
                  <Image
                    src={`https://ipfs.io/ipfs/${imageUrl.slice(7)}`}
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
                  {uploading && (
                    <p className="py-3 text-center">Uploading...</p>
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
