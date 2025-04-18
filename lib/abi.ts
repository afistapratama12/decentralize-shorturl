export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "shortCode",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "longUrl",
        "type": "string"
      }
    ],
    "name": "URLShortened",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "shortCode",
        "type": "string"
      }
    ],
    "name": "deleteURL",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "shortCode",
        "type": "string"
      }
    ],
    "name": "getURL",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listURL",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "shortCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "longUrl",
            "type": "string"
          }
        ],
        "internalType": "struct UrlShortener.ShortUrl[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "shortCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "longUrl",
        "type": "string"
      }
    ],
    "name": "setURL",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]