import { FC, useContext } from "react";
import Image from "next/image";
import { IItem } from "../../interfaces";
import { shortenAddress } from "../../utils";
import { ethers } from "ethers";
import { MarketContext } from "../../context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const NFTCard: FC<IItem> = (item) => {
  const { isConnected } = useContext(MarketContext);
  const { image, price, name, seller, itemId } = item;
  const id = ethers.BigNumber.from(itemId).toNumber();
 const router = useRouter();

  const goTo = () => {
     if(!isConnected) {
      notify();
      return;
     }
     router.push(`/nft/${id}`);
  }

  const notify = () => {
     toast.info("Please connect your wallet");
  }

  return (
    <div
      className="bg-white h-[600px] w-[350px] flex flex-col rounded-2xl cursor-pointer hover:opacity-[0.9]"
      onClick={goTo}
    >
      <div className="w-[350px] h-[350px]">
        <Image
          unoptimized
          src={image}
          alt="Picture of the author"
          className="rounded-t-2xl mt-4"
          layout="responsive"
          width={350}
          height={350}
        />
      </div>
      <div className="text-[#444] h-[250px] w-[350px] p-4 relative">
        <h4 className="px-1 py-2 text-3xl bold">{name}</h4>
        <h4 className="px-1 py-3 text-2xl">$ {price} eth</h4>
        <div className="flex items-center justify-start py-3">
          <div className="w-[50px] h-[50px] border-2 rounded-full border-blue-500">
            <Image
              unoptimized
              src={`https://joeschmoe.io/api/v1/${seller}`}
              alt="avatar"
              className="rounded-full"
              layout="responsive"
              width={40}
              height={40}
            />
          </div>
          <h4 className="text-xl px-1">{shortenAddress(seller)}</h4>
        </div>
        <i className="flex items-end justify-end absolute bottom-1 right-4">
          <svg
            width="208"
            height="28"
            viewBox="0 0 208 28"
            fill="none"
            className="w-[10rem]"
          >
            <path
              d="M160.84 0.0898438H160.21V27.9598H160.84V0.0898438Z"
              fill="#2C6EEB"
            ></path>
            <path
              d="M173 20.2H175.432V13.08L180.856 20.2H182.952V9H180.52V15.896L175.272 9H173V20.2Z"
              fill="#2C6EEB"
            ></path>
            <path
              d="M187.145 20.2H189.609V15.864H194.953V13.624H189.609V11.24H195.673V9H187.145V20.2Z"
              fill="#2C6EEB"
            ></path>
            <path
              d="M201.757 20.2H204.221V11.272H207.629V9H198.349V11.272H201.757V20.2Z"
              fill="#2C6EEB"
            ></path>
            <path
              d="M12.65 0.0898438L0.580017 7.05984V20.9998L12.65 27.9698L24.72 20.9998V7.05984L12.65 0.0898438ZM23.66 20.3898L12.65 26.7498L1.64002 20.3898V7.67984L12.65 1.31984L23.66 7.67984V20.3898Z"
              fill="white"
            ></path>
            <path
              d="M17.38 6.10986H7.89004L6.79004 10.9499H18.52L17.38 6.10986Z"
              fill="#aaaaaa"
            ></path>
            <path
              d="M9.58003 17.6001V14.3901L6.77003 12.6001L3.59003 14.9601L7.92003 22.5001H9.65003L11.7 20.6001V19.6401L9.58003 17.6001Z"
              fill="#aaaaaa"
            ></path>
            <path
              d="M15.73 11.6797H9.59003L10.62 14.3797L10.31 17.3997H12.65L15.01 17.3897L14.72 14.3797L15.73 11.6797Z"
              fill="#aaaaaa"
            ></path>
            <path
              d="M18.54 12.5801L15.76 14.3901V17.6001L13.64 19.6401V20.6001L15.68 22.4801H17.39L21.71 14.9601L18.54 12.5801Z"
              fill="#aaaaaa"
            ></path>
            <text
              textAnchor="center"
              fontFamily="'Noto Sans Mono'"
              fontSize="24"
              id="svg_6"
              y="20"
              x="34"
              strokeWidth="0"
              stroke="#aaaaaa"
              fill="#aaaaaa"
            >
              poether.com
            </text>
          </svg>
        </i>
      </div>
    </div>
  );
};
