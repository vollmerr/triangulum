const initialize = async (options) => {
    let data_set = {};
    console.log("in the Initial Data Structure");
    data_set.url = options.url;
    data_set.type = options.type;
    data_set.hopLimit = options.limit;
    data_set.target = options.keyword;

// prepend http:// if needed
    let url = data_set.url;
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
    }
    data_set.url = url;
// end prepend

//set bfs limit to a max of 3.
    if(data_set.type === 'bfs' && data_set.hopLimit > 10) {
      data_set.hopLimit = 10;
    }

// set dfs limit to a max of 10.
    if(data_set.type === 'dfs' && data_set.hopLimit > 10) {
      data_set.hopLimit = 10;
    }

    return data_set;
};

module.exports = initialize;
