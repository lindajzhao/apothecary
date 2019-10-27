exports.formatHerbUrl = function({ _id, name, price, color, image }) {
  return {
    _id,
    name,
    price,
    color,
    image,
    request: {
      type: "GET",
      url: `http://localhost:666/herbs/${_id}`
    }
  };
};

exports.formatSpellUrl = function({ _id, name, herbId, quantity }) {
  return {
    _id,
    name,
    herbId,
    quantity,
    request: {
      type: "GET",
      url: `http://localhost:666/spells/${_id}`
    }
  };
};
