const Wallet = require("../../models/wallet");
const userSchema = require("../../models/User");

exports.addMoney = async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.body.user });
  console.log(wallet);
  //console.log(req.body.balance) parseInt("10")
  console.log(parseInt(req.body.balance));

  if (wallet == null) {
    return res.status(400).json({
      message: "Wallet is Not Created ",
    });
    //   wallet.balance =  req.body.balance;
    //   const w = await wallet.save();
    // res.status(200).json({
    //   status: "success",
    //  data: w,
    // });
  } else {
    wallet.balance = parseInt(wallet.balance) + parseInt(req.body.balance);
    console.log(wallet.balance);
    const w = await wallet.save();

    res.status(200).json({
      status: "success",
      data: w,
    });
  }
};

exports.removeMoney = async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.body.user });
  console.log(wallet.balance);
  if (parseInt(wallet.balance) < parseInt(req.body.balance)) {
    return res.status(400).json({ msg: "insuffient balance" });
  } else {
    wallet.balance = parseInt(wallet.balance) - parseInt(req.body.balance);
    console.log(wallet.balance);
    console.log(req.body.balance);
    const w = await wallet.save();
    console.log(w);

    res.status(200).json({
      status: "success",
      data: w,
    });
  }
};

exports.getWallet = async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.params.user });
  console.log(wallet);
  res.status(200).json({
    status: "success",
    data: wallet,
  });
};
