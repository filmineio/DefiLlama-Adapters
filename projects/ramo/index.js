const BigNumber = require("bignumber.js");
const { fetchURL } = require("../helper/utils");

const RAMO_TVL_API = "http://127.0.0.1:3000/api/tvl";
const METHODOLOGY = "Uses the amount of FIL toknes locked in the protocol";

async function tvl(api) {
  const response = await fetchURL(RAMO_TVL_API);

  if (response.status != 200) {
    throw new Error("could not fetch information from the remote server");
  }

  const amount = new BigNumber(response.data.tvl).dividedBy(10 ** 18);

  return {
    ["filecoin"]: amount,
  };
}

module.exports = {
  timetravel: false,
  methodology: METHODOLOGY,
  filecoin: { tvl },
};
