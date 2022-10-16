const rootUrl = 'https://5fc9346b2af77700165ae514.mockapi.io';

function request({url, data = false, method = "GET"}) {
    return new Promise(async (resolve, reject) => {
        const options = {
            method
        };

        if (data && method === 'POST') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok) {
            resolve(result);
        } else {
            reject(result);
        }
    });
}

export const get = (url) => request({ url: rootUrl + url });
export const post = (url, data) => request({ url: rootUrl + url, data, method: 'POST' });
