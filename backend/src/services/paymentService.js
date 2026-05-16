const { paymentLinks, transactions } = require("../store/memoryStore");

function createPaymentLink(data) {
  const paymentLink = {
    id: `plink_${Date.now()}`,
    businessName: data.businessName,
    serviceTitle: data.serviceTitle,
    description: data.description,
    amount: data.amount,
    currency: data.currency || "USD",
    status: "active",
    createdAt: new Date().toISOString()
  };

  paymentLinks.push(paymentLink);

  return {
    paymentLink,
    url: `https://invopaid.app/pay/${paymentLink.id}`
  };
}

function getPaymentLinkById(id) {
  return paymentLinks.find((link) => link.id === id);
}

function createCheckoutSession(paymentLinkId) {
  const paymentLink = getPaymentLinkById(paymentLinkId);

  if (!paymentLink) return null;

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

  return transaction;
}

function getTransactionById(id) {
  return transactions.find((txn) => txn.id === id);
}

function updateTransactionStatus(transactionId, status) {
  const transaction = getTransactionById(transactionId);

  if (!transaction) return null;

  transaction.status = status;
  transaction.updatedAt = new Date().toISOString();

  return transaction;
}

module.exports = {
  createPaymentLink,
  getPaymentLinkById,
  createCheckoutSession,
  getTransactionById,
  updateTransactionStatus
};