const express = require("express");

const app = express();
const paymentLinks = [];
const transactions = [];
app.use(express.json());

/* ---------------- HEALTH ROUTE ---------------- */

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "invopaid-backend"
  });
});

/* -------- CREATE PAYMENT LINK ROUTE -------- */

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

/* -------- GET PAYMENT LINK BY ID ROUTE -------- */

app.get("/payment-links/:id", (req, res) => {
  const { id } = req.params;

  const paymentLink = paymentLinks.find((link) => link.id === id);

  if (!paymentLink) {
    return res.status(404).json({
      error: "Payment link not found"
    });
  }

  res.json(paymentLink);
});

/* ---------- CREATE CHECKOUT SESSION ---------- */

app.post("/checkout-session", (req, res) => {
  const { paymentLinkId } = req.body;

  if (!paymentLinkId) {
    return res.status(400).json({
      error: "paymentLinkId is required"
    });
  }

  const paymentLink = paymentLinks.find(
    (link) => link.id === paymentLinkId
  );

  if (!paymentLink) {
    return res.status(404).json({
      error: "Payment link not found"
    });
  }

  const transaction = {
    id: `txn_${Date.now()}`,
    paymentLinkId: paymentLink.id,
    amount: paymentLink.amount,
    currency: paymentLink.currency,
    status: "pending",
    checkoutUrl: `https://checkout.invopaid.app/session/${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  transactions.push(transaction);

  res.status(201).json({
    transaction
  });
});

app.get("/transactions/:id", (req, res) => {
  const { id } = req.params;

  const transaction = transactions.find(
    (txn) => txn.id === id
  );

  if (!transaction) {
    return res.status(404).json({
      error: "Transaction not found"
    });
  }

  res.json(transaction);
});

/* ---------------- SERVER START ---------------- */

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
