import { ethers } from 'hardhat';

async function main() {
    
const factory = await ethers.getContractFactory("Leaderboard");
const contract = await factory.deploy();

await contract.deployed();
    console.log("Contract Deployed to Address:", contract.address);
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });