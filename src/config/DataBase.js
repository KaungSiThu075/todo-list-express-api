const dotEnv = require('dotenv');

dotEnv.config();

console.log('db url ',process.env.MONGODB_URI );

module.exports = { db: process.env.MONGODB_URI };
