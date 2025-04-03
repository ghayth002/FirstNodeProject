const express = require("express");
const router = express.Router();
const user = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/registre", async (req, res) => {
  data = req.body;
  r = new user(data);
  salt = bcrypt.genSaltSync(10);
  crypp = await bcrypt.hashSync(data.password, salt);
  r.password = crypp;
  r.save()
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/login", async (req, res) => {
  data = req.body;
  usr = await user.findOne({ email: data.email });
  if (!usr) {
    res.status(404).send("email or password invalid");
  } else {
    validp = bcrypt.compareSync(data.password, usr.password);
    if (!validp) {
      res.status(401).send("email or password invalid !");
    } else {
      payload = {
        _id: usr.id,
        email: usr.email,
        name: usr.name,
      };
      token = jwt.sign(payload, "1234567");
      res.status(200).send({ mytoken: token });
    }
  }
});

router.post("/create", async (req, res) => {
  try {
    data = req.body;
    usr = new user(data);
    savedUser = await usr.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getall", (req, res) => {
  user
    .find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/getalll", async (req, res) => {
  try {
    users = await user.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
router.get("/get/:id", (req, res) => {
  myid = req.params.id;
  user
    .findById(myid)
    .then((userr) => {
      res.send(userr);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/getid/:id", async (req, res) => {
  try {
    myname = req.params.id;
    gh = await user.findOne({ _id: myname });
    res.send(gh);
  } catch (error) {
    res.send(error);
  }
});
router.delete("/delete/:id", (req, res) => {
  id =
    req.params.id *
    user
      .findOneAndDelete({ _id: id })
      .then((deleteduser) => {
        res.send(deleteduser);
      })
      .catch((err) => {
        res.send(err);
      });
});
router.delete("/deletee/:id", async (req, res) => {
  try {
    idu = req.params.id;
    deluser = await user.findOneAndDelete({ _id: idu });
    res.send("user deleted");
  } catch (err) {
    res.send(err);
  }
});
router.put("/update/:id", (req, res) => {
  id = req.params.id;
  newdata = req.body;
  user
    .findByIdAndUpdate({ _id: id }, newdata)
    .then((updatedu) => {
      res.send(updatedu);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.put("/updatee/:id", async (req, res) => {
  try {
    id = req.params.id;
    newdata = req.body;
    usup = await user.findByIdAndUpdate({ _id: id }, newdata);
    res.send(usup);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
