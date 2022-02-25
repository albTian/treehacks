// Pure functions meant as helpers to both the API and frontend

function isValidHttpUrl(input: string) {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const isValidOpensea = (input: string) => {
  if (!isValidHttpUrl(input)) {
    return false;
  }
  const url = new URL(input);
  return url.host == 'opensea.io'

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

export { isValidHttpUrl, isValidOpensea, makeid };
