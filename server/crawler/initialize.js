const initialize = async (options) => {
    let data_set = {};
    console.log("in the Initial Data Structure");
    data_set.url = options.url;
    data_set.type = options.type;
    data_set.hopLimit = options.limit;
    data_set.target = options.keyword;
    return data_set;
};

module.exports = initialize;
