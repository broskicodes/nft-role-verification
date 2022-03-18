import web3 from "@solana/web3.js";
import BN from "bn.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Wallet } from "../components/Wallet";
import { Verify } from "../components/Verify";

export default function Home() {
  // const getConnection = async () => {
  //   if(typeof window === "undefined")
  //     return {
  //       connection: undefined,
  //       publicKey: undefined,
  //     };

  //   const { solana } = window;
  
  //   if(!solana){
  //     alert("Please install a Solana Wallet (i.e. Phantom).");
  //     return {
  //       connection: undefined,
  //       publicKey: undefined,
  //     };
  //   }
  
  //   const res = await solana.connect();
  //   console.log('Connected with Public Key:', res.publicKey.toString());
  //   const { publicKey } = res;
  
  
  //   const connection = new web3.Connection("https://api.mainnet-beta.solana.com");
  
  //   return { 
  //     publicKey,
  //     connection,
  //   };
  // }
  
  // const getAllNfts = async () => {
  //   const { connection, publicKey } = await getConnection();
  
  //   const nftMetadatas = await Metadata.findDataByOwner(connection, publicKey);
  
  //   const promises = nftMetadatas.map(async (nft) => {
  //     const res = await fetch(nft.data.uri);
  //     const metadata = await res.json();
  
  //     return {
  //       mint: nft.mint,
  //       metadata: metadata,
  //     };
  //   });
  
  //   const nfts = await Promise.all(promises);
  //   console.log(nfts);
  
  //   return nfts;
  // }

  return (
    <Wallet>
      {/* <button onclick={getAllNfts()}>Get NFTs</button> */}
      <Verify />
    </Wallet>
  )
}
