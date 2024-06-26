import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from 'dotenv';

dotenv.config();
const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
