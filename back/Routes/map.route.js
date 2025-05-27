const express = require("express");
const mapRouter = express.Router();
const { receiveAddress, getPlaceAutocomplete } = require('../Controllers/map.controller');

mapRouter.post("/data", receiveAddress);
mapRouter.get("/autocomplete", getPlaceAutocomplete);

module.exports = { mapRouter };
