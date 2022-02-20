import axios from "axios";

const BASE = "https://api.opensea.io/api/v1/asset/";

const getLink = (address: string, tokenId: number) => {
  return `${BASE}${address}/${tokenId}`;
};

const getAsset = async (addr: string, ID: number): Promise<any> => {
  const link = getLink(addr, ID);

  let returnValue: any;
  await axios
    .get(link)
    .then(function (response) {
      // handle success
      console.log(response);
      returnValue = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      returnValue = null;
    })
    .then(function () {
      // always executed
    });
  return returnValue;
};

export { getAsset };
