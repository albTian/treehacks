// To allow TS to recognize that etherium and solana can exist on window
declare global {
  interface Window {
    ethereum: any;
    solana: any;
  }
}

export {}