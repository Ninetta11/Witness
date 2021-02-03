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
                // need to save this hash to the users database records for retrieving saved data from the blockchain
                console.log(bundle[0].hash);
                return bundle[0].hash
            })
            .catch(err => {
                console.error(err)
                return err
            });

    },

    extractFromBlockchain: (tailTransactionHash) => {
        //const tailTransactionHash =
        // 'WSWDP9IG9JD9IGMVCYGBAMZM9WYVBLCAFRDWCNPLOVEATSABD9MKCNEMSBDZYHSJVAGHCVUKZTTMTF999';

        iota.getBundle(tailTransactionHash)
            .then(bundle => {
                // this is the message which will have to be 
                console.log(JSON.parse(Extract.extractJson(bundle)));
                return JSON.parse(Extract.extractJson(bundle))
            })
            .catch(err => {
                console.error(err);
                return err
            });
    },

    generateNewAddress: function (seed) {
        return new Promise((function (resolve, reject) {
            iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
                .then(address => {
                    console.log('Your address is: ' + address);
                    resolve(address)
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                });
        }))
    }
}