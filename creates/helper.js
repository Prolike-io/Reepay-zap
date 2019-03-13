
module.exports = {
    main: async function (z, cust_id, sub_handle, customer_fields, subscription_fields) {
        var raw_sub_response = await this.sub_api(z, sub_handle)
        var raw_cust_response = await this.cust_api(z, cust_id)

        return {
            "cust": this.filter_object(customer_fields, raw_cust_response),
            "sub": this.filter_object(subscription_fields, raw_sub_response)
        }
    },

    filter_object: function (return_filter, obj) {
        var rtn_obj = {};
        return_filter.forEach(el => {
            rtn_obj[el] = obj[el];
        });
        return rtn_obj;
    },

    cust_api: function (z, cust_id) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/customer/' + cust_id,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content))
        return promise
    },

    sub_api: function (z, cust_id) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/subscription/' + cust_id,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content))
        return promise
    }
}