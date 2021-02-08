import axios from "axios";

const API_KEY = 'AIzaSyCHR4pzxUoksFuNAA1Wkp0Xs7qmdn9wlKI';

export const getLocation = (lat, long) => {
    return new Promise((function (resolve, reject) {
        const options = {
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`,
        };

        axios.request(options)
            .then(function (response) {
                response.data.results.map((address) => {
                    if (address.types[0] === "locality") {
                        resolve(address.address_components[0].long_name + ", " + address.address_components[2].long_name)
                    }
                })
            }).catch(function (error) {
                reject(error);
            });
    }))
}

