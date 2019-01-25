const fs = require('fs')
const request = require('request')

const macaroonString = fs.readFileSync('./admin.macaroon');
const macaroonHexString = Buffer.from(macaroonString, 'utf8').toString('hex');

request.get({
  url: 'https://localhost:8080/v1/getinfo',
  rejectUnauthorized: false,
  headers: {
    'Grpc-Metadata-macaroon': macaroonHexString
  }
}, (err, res, body) => {
  /*
  { 
    identity_pubkey: '0346095e50ed1f8cf4dbda1fca442cd2ebccf082912e33c1c2e19868f1f56a190a',
    alias: '0346095e50ed1f8cf4db',
    num_active_channels: 5,
    num_peers: 6,
    block_height: 1453958,
    block_hash: '00000000000822436d3fafe75970c56c16e61682a7babe12b37d0f9003de11af',
    synced_to_chain: true,
    testnet: true,
    chains: [ 'bitcoin' ],
    best_header_timestamp: '1548454287',
    version: '0.5.1-beta commit=' 
  }
  */
  console.log(JSON.parse(body))
})
