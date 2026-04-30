PayFlow API Spec
Overview

PayFlow provides hosted payment links for small businesses. It enables merchants to create payment links, accept payments via provider integrations (starting with Stripe), and track transactions.

The system is designed around a provider-agnostic adapter layer to support multiple payment providers in the future.

Core Objects
Merchant

Represents a small business using PayFlow.

{
  "id": "merchant_123",
  "businessName": "Kay Yoga Studio",
  "email": "owner@example.com",
  "provider": "stripe",
  "createdAt": "2026-04-28T10:00:00Z"
}
Payment Link

Represents a reusable hosted payment page.

{
  "id": "plink_123",
  "merchantId": "merchant_123",
  "title": "Private Session",
  "description": "1-hour private yoga session",
  "amount": 7500,
  "currency": "usd",
  "status": "active",
  "url": "https://payflow.app/pay/plink_123"
}
Payment Session

Represents a customer’s payment attempt.

{
  "id": "psess_123",
  "paymentLinkId": "plink_123",
  "provider": "stripe",
  "providerSessionId": "cs_test_123",
  "status": "pending"
}
Transaction

Represents the final payment outcome.

{
  "id": "txn_123",
  "paymentSessionId": "psess_123",
  "amount": 7500,
  "currency": "usd",
  "status": "succeeded",
  "provider": "stripe",
  "createdAt": "2026-04-28T10:00:00Z"
}
API Endpoints
1. Create Merchant

Creates a merchant account.

POST /api/merchants

Request

{
  "businessName": "Kay Yoga Studio",
  "email": "owner@example.com",
  "provider": "stripe"
}

Response

{
  "id": "merchant_123",
  "businessName": "Kay Yoga Studio",
  "email": "owner@example.com",
  "provider": "stripe"
}
2. Create Payment Link

Creates a hosted payment link.

POST /api/payment-links

Request

{
  "merchantId": "merchant_123",
  "title": "Private Session",
  "description": "1-hour private yoga session",
  "amount": 7500,
  "currency": "usd"
}

Response

{
  "id": "plink_123",
  "url": "https://payflow.app/pay/plink_123",
  "status": "active"
}
3. Get Payment Link

Fetches checkout data.

GET /api/payment-links/{paymentLinkId}

Response

{
  "id": "plink_123",
  "merchant": {
    "businessName": "Kay Yoga Studio"
  },
  "title": "Private Session",
  "description": "1-hour private yoga session",
  "amount": 7500,
  "currency": "usd",
  "status": "active"
}
4. Create Payment Session

Creates a provider-backed payment session.

POST /api/payment-sessions

Request

{
  "paymentLinkId": "plink_123"
}

Response

{
  "id": "psess_123",
  "provider": "stripe",
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_test_123",
  "status": "pending"
}
5. List Transactions

Returns merchant transactions.

GET /api/merchants/{merchantId}/transactions

Response

[
  {
    "id": "txn_123",
    "amount": 7500,
    "currency": "usd",
    "status": "succeeded",
    "provider": "stripe",
    "createdAt": "2026-04-28T10:00:00Z"
  }
]
6. Provider Webhook

Handles async updates from Stripe.

POST /api/webhooks/stripe

Events Handled

checkout.session.completed
payment_intent.succeeded
payment_intent.payment_failed

Internal Flow

Verify webhook signature
Match provider session ID
Update payment session
Create transaction
Mark transaction status
Provider Adapter Interface

PayFlow uses an adapter interface to support multiple payment providers.

interface PaymentProviderAdapter {
  createPaymentSession(input: any): Promise<any>;
  getPaymentStatus(providerSessionId: string): Promise<string>;
  refundPayment(transactionId: string): Promise<any>;
}
Stripe Adapter — v1
class StripeAdapter implements PaymentProviderAdapter {
  createPaymentSession(input) {
    // Creates Stripe Checkout session
  }

  getPaymentStatus(providerSessionId) {
    // Retrieves Stripe session or payment intent status
  }

  refundPayment(transactionId) {
    // Creates Stripe refund
  }
}
Payment Statuses
pending
succeeded
failed
cancelled
refunded
MVP Scope
Included
Merchant creation
Payment links
Hosted checkout
Stripe integration
Webhooks
Transaction tracking
Not Included
Multi-provider routing
Subscriptions
Split payments
Fraud / risk
Taxes
Chargebacks

Payment Flow (End-to-End)

Describes how a payment moves through the system from initiation to completion.

Step 1: User opens payment link
User visits: https://payflow.app/pay/{paymentLinkId}
Frontend calls:
GET /api/payment-links/{paymentLinkId}
API returns merchant name, amount, and description
Step 2: User initiates payment
User clicks Pay
Frontend calls:
POST /api/payment-sessions
API:
Fetches payment link
Calls provider adapter (Stripe)
Creates Stripe Checkout session
API returns:
{
  "checkoutUrl": "https://checkout.stripe.com/..."
}
Step 3: User completes payment on provider
User is redirected to Stripe Checkout
Payment is processed by Stripe
Step 4: Webhook updates system state
Stripe sends event to:
POST /api/webhooks/stripe
Backend:
Verifies webhook signature
Matches providerSessionId
Updates Payment Session
Creates Transaction record
Marks status (succeeded or failed)
Step 5: Final state
Transaction is stored in system
Merchant can view it via:
GET /api/merchants/{merchantId}/transactions