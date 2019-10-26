const utils = {
  formatHerbUrl: function({ _id, name, price, color }) {
    return {
      _id,
      name,
      price,
      color,
      request: {
        type: "GET",
        url: `http://localhost:666/herbs/${_id}`
      }
    };
  }
};

module.exports = utils;
