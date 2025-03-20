// app/api/plans/route.js

import { NextResponse } from 'next/server';
import { createPlan } from '@/lib/rapyd';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Example request body for creating a plan
    // {
    //   "name": "Monthly Music Subscription",
    //   "product": "prod_123456789",  // Product ID from createProduct
    //   "currency": "SGD",
    //   "amount": 3,
    //   "interval": "month",
    //   "interval_count": 1,
    //   "trial_period_days": 0,
    //   "billing_cycles": 0  // 0 for unlimited
    // }
    
    const response = await createPlan(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}