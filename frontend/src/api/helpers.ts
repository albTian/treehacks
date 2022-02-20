import axios from "axios";

const BASE = "https://api.opensea.io/api/v1/asset/";
const HEROKU = "https://saveas-img-processing.herokuapp.com/";

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
      returnValue = response.data;
    })
    .catch(function (error) {
      // handle error
      returnValue = null;
    })
    .then(function () {
      // always executed
    });
  return returnValue;
};

const getOverlay = async (imgurl: string, imgname: string) => {
  let returnValue: any;
  const data = {
    imgurl: imgurl,
    imgname: imgname
  }
  // await axios
  //   .post(HEROKU, data)
  //   .then((response) => {
  //     returnValue = response.data;
  //   })
  //   .catch((error) => {
  //     returnValue = null;
  //   })
  //   .then(() => {});
  await axios
    .get(HEROKU)
    .then((response) => {
      returnValue = response;
    })
    .catch((error) => {
      returnValue = null;
    })
    .then(() => {});
  console.log(returnValue);
  
  return returnValue;
};

export { getAsset, getOverlay };
