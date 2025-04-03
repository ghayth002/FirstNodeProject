const express = require("express");
const router = express.Router();
const Product = require("../Models/product");
const multer = require("multer");

filenamee = "";
const mystorage = multer.diskStorage({
  destination: "./Uploads",
  filename: (req, file, red) => {
    let date = Date.now();
    let f1 = date + "." + file.mimetype.split("/")[1];
    red(null, f1);
    filenamee = f1;
  },
});
const upload = multer({ storage: mystorage });
router.post("/addp", upload.any("image"), async (req, res) => {
  try {
    newp = req.body;
    produit = new Product(newp);
    produit.image = filenamee;

    savedpr = await produit.save();
    filenamee = "";
    res.status(200).send(savedpr);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/getp/:id", async (req, res) => {
  try {
    id = req.params.id;
    getP = await Product.findById({ _id: id });
    res.status(200).send(getP);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/getPs", (req, res) => {
  Product.find()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.delete("/deletP/:id", async (req, res) => {
  try {
    id = req.params.id;
    dp = await Product.findByIdAndDelete({ _id: id });
    res.send("User deleted");
  } catch (err) {
    res.status(200).send(err);
  }
});
router.put("/upP/:id", async (req, res) => {
  try {
    id = req.params.id;
    newdata = req.body;
    updatep = await Product.findByIdAndUpdate({ _id: id }, newdata);
    res.status(200).send(newdata);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
