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

function isValidHttpUrl(input: string) {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getOverlay = async (imgurl: string) => {
  let returnValue: any;

  if (isValidHttpUrl(imgurl)) {
    const data = {
      imgurl: imgurl,
      imgname: makeid(6),
    };
    console.log('data');
    console.log(data);
    
    await axios
      .post(HEROKU, data)
      .then((response) => {
        console.log("response");
        console.log(response);

        returnValue = response.data;
      })
      .catch((error) => {
        console.log("error");
        returnValue = null;
      })
      .then(() => {});
  }

  return returnValue;
};

export { getAsset, getOverlay };
