const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const pairSchema = mongoose.Schema({
  pairs: [
    {
      chainId: { type: String, require: true },
      dexId: { type: String, require: true },
      url: { type: String, require: true },
      pairAddress: { type: String, require: true, unique: true },
      baseToken: {
        address: { type: String, require: true },
        name: { type: String, require: true },
        symbol: { type: String, require: true },
      },
      quoteToken: {
        address: { type: String, require: true },
        name: { type: String, require: true },
        symbol: { type: String, require: true },
      },
      priceNative: { type: String, require: true },
      priceUsd: { type: String, require: true },
      txns: {
        m5: {
          buys: { type: Number, require: true },
          sells: { type: Number, require: true },
        },
        h1: {
          buys: { type: Number, require: true },
          sells: { type: Number, require: true },
        },
        h6: {
          buys: { type: Number, require: true },
          sells: { type: Number, require: true },
        },
        h24: {
          buys: { type: Number, require: true },
          sells: { type: Number, require: true },
        },
      },
      volume: {
        h24: { type: Number, require: true },
        h6: { type: Number, require: true },
        h1: { type: Number, require: true },
        m5: { type: Number, require: true },
      },
      priceChange: {
        m5: { type: Number, require: true },
        h1: { type: Number, require: true },
        h6: { type: Number, require: true },
        h24: { type: Number, require: true },
      },
      liquidity: {
        usd: { type: Number, require: true },
        base: { type: Number, require: true },
        quote: { type: Number, require: true },
      },
      pairCreatedAt: { type: Date, require: true },
      info: {
        imageUrl: { type: String, require: true },
        websites: [
          {
            label: { type: String, require: true },
            url: { type: String, require: true },
          },
        ],
        socials: [
          {
            type: { type: String, require: true },
            url: { type: String, require: true },
          },
        ],
      },
    },
  ],
});

pairSchema.plugin(uniqueValidator);

module.exports = mongoose.model("pair", pairSchema);
