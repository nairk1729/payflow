# PayFlow — User Flows

## 1. Purpose

This document outlines the core user journeys for PayFlow.

The goal is to clearly define:
- how merchants use the product
- how customers complete payments
- where key interactions and decisions happen

These flows guide product design, UI, and backend behavior.

---

## 2. Primary Actors

### Merchant
A small business owner creating payment links and collecting payments.

### Customer (Buyer)
A user who receives a payment link and completes a payment.

---

## 3. Core Flows (MVP)

1. Merchant onboarding
2. Payment link creation
3. Buyer payment flow
4. Payment confirmation
5. Transaction tracking

---

## 4. Merchant Onboarding Flow

### Goal
Enable a merchant to sign up and connect a payment provider.

### Flow

```text
Visit PayFlow landing page
   ↓
Click "Get Started"
   ↓
Sign up (email + password)
   ↓
Login to dashboard
   ↓
Connect Stripe account
   ↓
Redirect back to PayFlow
   ↓
Connection successful