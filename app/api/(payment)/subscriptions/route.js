// app/api/subscriptions/route.js

import { NextResponse } from 'next/server';
import { createSubscription } from '@/lib/rapyd';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Example request body for creating a subscription
    // {
    //   "customer": "cus_123456789",  // Customer ID from createCustomer
    //   "plan": "plan_123456789",     // Plan ID from createPlan
    //   "payment_method": "pm_123456789",  // Payment method ID associated with the customer
    //   "billing_period": 1,
    //   "billing_day": 1
    // }
    
    const response = await createSubscription(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}