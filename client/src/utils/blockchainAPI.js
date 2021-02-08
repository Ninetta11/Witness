const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const Extract = require('@iota/extract-json');

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

const depth = 3;
const minimumWeightMagnitude = 9;
const securityLevel = 2;

export default {
    sendToBlockchain: (address, seed, declaration) => {
        return new Promise((function (resolve, reject) {
            const message = JSON.stringify({ "message": declaration });
            const messageInTrytes = Converter.asciiToTrytes(message);

            const transfers = [
                {
                    value: 0,
                    address: address,
                    message: messageInTrytes
                }
            ];

            iota.prepareTransfers(seed, transfers)
                .then(trytes => {
                    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
                })
                .then(bundle => {
                    // returns hash from the blockchain
                    resolve(bundle[0].hash)
                })
                .catch(err => {
                    reject(err)
                });
        }))
    },

    extractFromBlockchain: (tailTransactionHash) => {
        return new Promise((function (resolve, reject) {
            iota.getBundle(tailTransactionHash)
                .then(bundle => {
                    resolve(JSON.parse(Extract.extractJson(bundle)))
                })
                .catch(err => {
                    reject(err)
                });
        }))
    },

    generateNewAddress: function (seed) {
        return new Promise((function (resolve, reject) {
            iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
                .then(address => {
                    resolve(address)
                })
                .catch(err => {
                    reject(err)
                });
        }))
    }
}