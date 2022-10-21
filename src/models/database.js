const users = require ("./user");
const product = require("./product")

module.exports = async (client) => {
    try {
        await client.query(users.CREATE_TABLE);
        await client.query(product.CREATE_TABLE);
        console.log(`Table(s) Created`);
    }
    catch(error) {
        console.log({error});
    }
};
