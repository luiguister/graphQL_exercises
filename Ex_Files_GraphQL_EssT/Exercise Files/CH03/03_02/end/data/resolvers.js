const productDatabase = {};

 export const resolvers = {
    getProducts: ({ id }) => {
        return new Product(id, productDatabase[id]);
    },
    createProduct: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        productDatabase[id] = input;
        return new Product(id, input);
    }
};

export default resolvers;
