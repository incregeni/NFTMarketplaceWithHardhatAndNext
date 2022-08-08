import { NextPage } from "next";
import Link from "next/link";
import React, { useContext } from "react";
import { MarketContext } from "../../context";

const styles = {
  menu: "col-[4] flex items-center justify-around",
  menuItemButton:
    "bg-gradient-to-r from-[#1199fa] to-[#11d0fa] p-2 rounded-md cursor-pointer",
  menuItemLink: "cursor-pointer hover:text-pink-600",
};

export const NavMenu: NextPage = () => {
  const { isConnected, connectWallet } = useContext(MarketContext);
  return (
    <ul className={styles.menu}>
      <li>
        <Link href="/explore">
          <a className={styles.menuItemLink}>Explore</a>
        </Link>
      </li>
      {isConnected && (
        <li>
          <Link href="/create">
            <a className={styles.menuItemButton}>Create</a>
          </Link>
        </li>
      )}
      <li>
        <a>|</a>
      </li>

      <li>
        {!isConnected ? (
          <a className={styles.menuItemButton} onClick={connectWallet}>
            Connect
          </a>
        ) : (
          <Link href="/dashboard">
            <a className={styles.menuItemLink}>Dashboard</a>
          </Link>
        )}
      </li>
    </ul>
  );
};
