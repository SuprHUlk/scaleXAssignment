const express = require("express");

const {
  getPrices,
  getVolumes,
  deletePair,
} = require("../services/pairService");

const router = express.Router();

// Endpoint to get prices
router.get("/getPrices", async (req, res) => {
  try {
    // Call getPrices service function
    const { code, result } = await getPrices();

    res.status(code).json(result);
  } catch (e) {
    res
      .status(e.code || 500)
      .json({ error: e.message || "Internal Server Error" });
  }
});

// Endpoint to get volumes
router.get("/getVolumes", async (req, res) => {
  try {
    // Call getVolumes service function
    const { code, result } = await getVolumes();

    res.status(code).json(result);
  } catch (e) {
    res
      .status(e.code || 500)
      .json({ error: e.message || "Internal Server Error" });
  }
});

// Endpoint to delete a pair by pairAddress
router.delete("/deletePair/:pairAddress", async (req, res) => {
  try {
    // Call deletePair service function with pairAddress from request parameters
    const { code, result } = await deletePair(req.params.pairAddress);

    res.status(code).json(result);
  } catch (e) {
    res
      .status(e.code || 500)
      .json({ error: e.message || "Internal Server Error" });
  }
});

module.exports = router;
