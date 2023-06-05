import dotenv from 'dotenv';

// dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` }); // change according to your need
dotenv.config();

const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
};

export default config;