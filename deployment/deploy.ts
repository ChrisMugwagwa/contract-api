// import ethers from 'ethers';
import * as hardhat from 'hardhat'

async function main() {
    
const factory = hardhat.ethers.ContractFactory("Leaderboard");
const contract = await factory.deploy("stolencode.eth");
    console.log("Contract Deployed to Address:", contract.address);
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });