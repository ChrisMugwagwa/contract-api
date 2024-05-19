import * as ethers from "ethers";
import leaderboardAbi from "../abi/Leaderboard.json";
import * as dotenv from "dotenv";

dotenv.config();

const walletKey = process.env.WALLET_KEY || "";
const infuraApiKey = process.env.INFURA_KEY || "";

if (!walletKey || !infuraApiKey) {
  throw new Error("WALLET_KEY and INFURA_KEY must be set in the .env file");
}

const contractAddress = "0x7Fc754723206886aA50438c95d90748aB58e2AD4";

const provider = new ethers.providers.InfuraProvider("sepolia", infuraApiKey);
let wallet = new ethers.Wallet(walletKey, provider);

const signer = wallet.connect(provider);

const contract = new ethers.Contract(contractAddress, leaderboardAbi, signer);

export async function callAddPlayer(address: string, score: number) {
  if (!ethers.utils.isAddress(address))
    throw new Error(`address: ${address}. is not a valid Eth address`);

  const tx = await contract.addPlayer(address, score);
  console.log("Transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Transaction confirmed:", receipt);
  return { transactionhash: tx.hash };
}

export async function callGetPlayers() {
  const players = await contract.getPlayers();
  console.log("getPlayers result:", players);

  return players.map((player: any) => {
    return {
      address: player[0],
      score: parseInt(player[1]),
    };
  });
}
