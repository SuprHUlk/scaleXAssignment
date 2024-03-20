const PairModel = require("../models/pairModel");

// Function to fetch prices of pairs from the database
const getPrices = async () => {
  try {
    const pairs = await PairModel.find();

    const validationResult = validation(pairs);
    if (validationResult) {
      return validationResult;
    }

    // Extract price information from the pairs
    const prices = pairs
      .map((pairData) => {
        const documentId = pairData._id;
        return pairData.pairs.map((pair) => {
          return {
            _id: documentId,
            pairAddress: pair.pairAddress,
            priceNative: pair.priceNative,
            priceChange: pair.priceChange,
            priceUsd: pair.priceUsd,
          };
        });
      })
      .flat();

    return { code: 200, result: prices };
  } catch (e) {
    return { code: 500, error: e.message || "Internal Server Error" };
  }
};

// Function to fetch volumes of pairs from the database
const getVolumes = async () => {
  try {
    const pairs = await PairModel.find();

    const validationResult = validation(pairs);
    if (validationResult) {
      return validationResult;
    }

    // Extract volume information from the pairs
    const volumes = pairs
      .map((pairData) => {
        const documentId = pairData._id;
        return pairData.pairs.map((pair) => {
          return {
            _id: documentId,
            pairAddress: pair.pairAddress,
            volume: pair.volume,
          };
        });
      })
      .flat();

    return { code: 200, result: volumes };
  } catch (e) {
    return { code: 500, error: e.message || "Internal Server Error" };
  }
};

// Function to delete a pair by pairAddress
const deletePair = async (pairAddress) => {
  try {
    const pairDocument = await PairModel.findOne({
      "pairs.pairAddress": pairAddress,
    });

    // If pair document is not found, return error response
    if (!pairDocument) {
      return {
        code: 400,
        result: { message: "Pair address " + pairAddress + " doesn't exist." },
      };
    }

    const _id = pairDocument._id;

    // Filter out the pair with the given pairAddress
    const updatedPairs = pairDocument.pairs.filter((pair) => {
      return pair.pairAddress !== pairAddress;
    });

    const data = {
      schemaVersion: "1.0.0",
      pairs: updatedPairs,
    };

    const result = await PairModel.findByIdAndUpdate(_id, data, { new: true });

    return {
      code: 200,
      result: {
        message: "Pair address " + pairAddress + " successfully deleted.",
      },
    };
  } catch (e) {
    return {
      code: 500,
      result: {
        message: "Pair address " + pairAddress + " deletion unsuccessful.",
      },
    };
  }
};

// Function to perform validation on pairs data
const validation = (pairs) => {
  if (!pairs || pairs.length === 0) {
    return { code: 404, message: "No data found" };
  }
};

module.exports = { getPrices, getVolumes, deletePair };
