

import axios from "axios";

// Function to get the current price of a cryptocurrency in USDT
const getCryptoToUsdtRate = async (crypto: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
    );

    // Extract and return the USDT value
    return response.data[crypto]?.usd || 0;
  } catch (error) {
    console.error(`Failed to fetch ${crypto} to USDT rate:`, error);
    return 0;
  }
};

export default getCryptoToUsdtRate