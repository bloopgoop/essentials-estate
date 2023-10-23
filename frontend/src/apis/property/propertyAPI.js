import { api } from '../configs/axiosConfigs';
import { defineCancelApiObject } from '../configs/axiosUtils';

export const PropertyAPI = {
    get: async function (id, cancel = false) {
        const response = await api.request({
            url: `/products/:id`,
            method: "GET",
            // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
            })
        // returning the product returned by the API
        return response.data.product
    },

    // add more methods here
}

const cancelApiObject = defineCancelApiObject(PropertyAPI);
