/* 
  this is the model or the structure of our response 
  here we just make sure we don't expose unnecessary data to the client
*/

module.exports.userModel = (payload, filter) => {
  switch (filter) {
    case "sendOne":
      return {
        username: payload.username,
        _id: payload._id,
        role: payload.role,
      };
    case "sendAll":
      return payload;

    case "destroyCookie":
      return "Successful logout";
  }
};

module.exports.productModel = (payload, filter) => {
  switch (filter) {
    case "sendOne":
      return {
        _id: payload._id,
        title: payload.title,
        price: payload.price,
        photos: payload.photos.map((photoArray) => {
          return {
            fullsize: photoArray[0],
            thumbnail: photoArray[1],
          };
        }),
        description: payload.description,
        type: payload.type,
      };

    case "sendAll":
      return payload.map((product) => {
        return {
          _id: product._id,
          title: product.title,
          price: product.price,
          photos: product.photos.map((photoArray) => {
            return {
              fullsize: photoArray[0],
              thumbnail: photoArray[1],
            };
          }),
          description: product.description,
        };
      });
  }
};
