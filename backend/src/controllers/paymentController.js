const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

let payment = async (req, res) => {
  const { amount, bookingInfo } = req.body;
  const orderInfo = "Hotel Payment With Momo";
  const partnerCode = "MOMO";
  const redirectUrl =
    "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const ipnUrl =
    "https://600e-2402-800-63b9-c02c-514a-6e66-618d-1aab.ngrok-free.app/api/payment/callback";
  const requestType = "payWithMethod";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = Buffer.from(JSON.stringify({ bookingInfo })).toString(
    "base64"
  );
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  console.log(bookingInfo);

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

let callback = async (req, res) => {
  if (req.body.resultCode == 0) {
    const extraData = Buffer.from(req.body.extraData, "base64").toString(
      "utf-8"
    );
    const bookingInfo = JSON.parse(extraData).bookingInfo;
    console.log(bookingInfo);
    // Xử lý thông tin booking tại đây
  }
  return res.status(200).json(req.body);
};

let transactionStatus = async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId,
    signature,
    lang: "vi",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };
  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = {
  payment,
  callback,
  transactionStatus,
};
