import axios from "axios";
import { isValidHttpUrl, makeid } from "./helpers";

const OPENSEA_API = "https://api.opensea.io/api/v1/asset/";
const HEROKU_ENDPOINT = "https://saveas-img-processing.herokuapp.com/";

// Gets the opensea asset
const getAsset = async (addr: string, ID: number): Promise<any> => {
  const link = `${OPENSEA_API}${addr}/${ID}`;
  if (!isValidHttpUrl(link)) {
    console.log("imgurl was not a valid url...");
    return null;
  }

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

// Gets the image with url on it
// Post request to API
const getOverlay = async (imgurl: string) => {
  let returnValue: any;

  // Guard clause prefered over wrapping if statements
  if (!isValidHttpUrl(imgurl)) {
    console.log("imgurl was not a valid url...");
    return null;
  }

  const data = {
    imgurl: imgurl,
    imgname: makeid(6),
  };

  await axios
    .post(HEROKU_ENDPOINT, data)
    .then((response) => {
      returnValue = response.data;
    })
    .catch((error) => {
      returnValue = null;
    })
    .then(() => {});

  return returnValue;
};

export { getAsset, getOverlay };
