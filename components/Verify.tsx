import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { 
  Transaction, 
  TransactionInstruction,
  SystemProgram,
  AccountMeta
} from "@solana/web3.js";
import hashlist from '../data/hashlist.json';

export const Verify = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signMessage } = useWallet();

  const verifyNftOwnership = async (isLedger) => {  
    if(!connection){
      return;
    }
  
    if(!isLedger){
      const msg = "Please sign to verify wallet ownership.";
      const signedMsg = await signMessage(
        new TextEncoder().encode(msg),
      );
  
      console.log(signedMsg);
    } else {
      alert("You will be prompted to send a transaction to yourself to verify ownership.");
      
      const tx = new Transaction({
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        feePayer: publicKey,
      });
        
      tx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 1
        }),
      );
  
      const txId = await sendTransaction(
        tx,
        connection,
      );
  
      console.log(txId);
    }

    const nftMetadatas = await Metadata.findDataByOwner(connection, publicKey);

    let owner = false;
    nftMetadatas.forEach((mtdt) => {
      if(hashlist.includes(mtdt.mint)){
        owner = true;
      }
    });

    console.log(owner);
    if(owner){
      alert("You own an Metavillage NFT!");
    } else {
      alert("Seems like you don't own a Metavillage NFT.")
    }
    return owner;
  }

  return (
    <div>
      <button onClick={() => { verifyNftOwnership(false) }}>Verify</button>
      <button onClick={() => { verifyNftOwnership(true) }}>Verify Ledger</button>
    </div>
  );
};
