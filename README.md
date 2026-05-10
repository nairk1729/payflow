

# PayFlow

Hosted payment links and checkout flows for small businesses.

## What is PayFlow?

PayFlow helps small business owners create a payment link and accept payments without building complex checkout flows.

## Why I’m building this

Existing payment tools are often fragmented, overly complex, or designed for larger businesses. PayFlow focuses on a lightweight, hosted checkout experience for small merchants.

## MVP

- Payment link generation
- Hosted checkout experience
- Stripe-powered payment processing
- Payment confirmation flow
- Basic payment tracking

## Tech Stack

- Figma (wireframes & prototype)
- GitHub
- Planned: React / Next.js
- Planned: Node.js backend APIs
- Planned: Stripe integration

## Vision

PayFlow starts as a hosted payment link product and evolves into a provider-agnostic payments orchestration layer.

## Architecture

![PayFlow Architecture](diagrams/architecture-diagram.png)

## Features

- Create customer payment links
- Hosted checkout experience
- Invoice/payment summary
- Secure checkout messaging
- Copy/share payment links
- Optional email receipt field
- Mobile-friendly payment flow

## Product Flow

## Product Flow

Merchant creates payment link  
→ Payment link generated  
→ Customer opens hosted checkout  
→ Customer completes payment  
→ Payment confirmation displayed

## Roadmap

- Backend payment APIs
- Stripe webhook handling
- Merchant dashboard
- Email receipt templates
- Mobile responsive UI
- Multi-provider payment routing

## Interactive Prototype

[Figma Prototype](https://www.figma.com/proto/NcC501i8FuWXN8eEjLXKDD/Payflow-Wireframes?node-id=176-42&t=Rwi5VnO79G4hDEfN-1)


## 🎨 Wireframes

### Create Payment Link (Merchant)

This screen allows small business owners to generate a payment link by entering service details.

![Create Payment Link](design/wireframes/create-payment-link.png)
---

### Payment Link Generated

This screen shows the generated payment link and sharing options for merchants.

![Payment Link Generated](design/wireframes/Payment-Link-Generated.png)

## Customer Checkout Page

Users receiving a payment link are taken to a clean hosted checkout experience with:

- Secure payment messaging
- Payment summary
- Card details form
- CVV and expiry validation fields
- Optional email receipt
- Clear primary CTA

### Checkout Experience

![Customer Checkout Page](design/wireframes/customer-checkout-page.png)

### Payment Confirmation

![Payment Confirmation](design/wireframes/payment-confirmation.png)

## Project Status

PayFlow is currently in active development.

I'm building this in the open to explore:
- Simple payments for small businesses
- Payment provider abstraction
- Checkout UX and conversion

The current focus is building a tight MVP around hosted payment links and checkout flows.

## Author

Designed and developed by Kavitha Nair.
