const express = require("express");

const app = express();
const paymentLinks = [];
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "invopaid-backend"
  });
});

app.post("/payment-links", (req, res) => {
  const { businessName, serviceTitle, description, amount, currency } = req.body;

    if (!businessName || !serviceTitle || !amount) {
    return res.status(400).json({
      error: "Missing required fields",
      requiredFields: ["businessName", "serviceTitle", "amount"]
    });
  }

if (!businessName || !serviceTitle || amount === undefined) {
    return res.status(400).json({
      error: "Amount must be a number greater than 0"
    });
  }

  const paymentLink = {
    id: `plink_${Date.now()}`,
    businessName,
    serviceTitle,
    description,
    amount,
    currency: currency || "USD",
    status: "active",
    createdAt: new Date().toISOString()
  };

  paymentLinks.push(paymentLink);

  res.status(201).json({
    paymentLink,
    url: `https://invopaid.app/pay/${paymentLink.id}`
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
