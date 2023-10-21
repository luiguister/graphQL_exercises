import { reject } from 'lodash';
import { Widgets } from './dbConnectors';

export const resolvers = {
    getProduct: async({id}) => {
        try {
            const product = await Widgets.findById({_id: id}).exec()
            return product;
        } catch (err) {
            console.log(err);
        }
    },
    getAllProducts: async () => {
        try {
            const productList = await Widgets.find()
            return productList;
        } catch (err) {
            console.log(err);
        }
    },
    createProduct: ({input}) => {
        // let id = require('crypto').randomBytes(10).toString('hex');
        // productDatabase[id] = input;
        // return new Product(id, input);
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });
        
        newWidget.id = newWidget._id;
        return new Promise((resolve) => {
            
             newWidget.save(newWidget)
             .then(() => {
                resolve(newWidget)
             }).catch((err) => {
                console.log(err);
             })
        });
    },
    updateProduct: async ({input}) => {
        try {
            const result = await Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true }).exec()
            return result;
        } catch (err) {
            console.log(err);
        }
    },
    deleteProduct: async ({id}) => {
        try {
            const result = await Widgets.deleteOne({_id: id})
            return 'Successfully Deleted Product ID: ' + id ;
        } catch (err) {
            console.log(err);
        }
    }
};

export default resolvers;