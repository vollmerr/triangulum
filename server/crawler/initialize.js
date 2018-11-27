const initialize = async (options) => {
    let data_set = {};
    console.log("in the Initial Data Structure");
    data_set.url = options.url;
    data_set.type = options.type;
    data_set.hopLimit = options.limit;
    data_set.target = options.keyword;

    let url = data_set.url;

    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
    }

    data_set.url = url;

    return data_set;
};

module.exports = initialize;
