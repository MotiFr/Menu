// app/api/customers/route.js

import { NextResponse } from 'next/server';
import { createCustomer } from '@/lib/rapyd';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Example request body for creating a customer
    // {
    //   "name": "John Doe",
    //   "email": "john.doe@example.com",
    //   "payment_method": {
    //     "type": "sg_credit_card",
    //     "fields": {
    //       "number": "4111111111111111",
    //       "expiration_month": "12",
    //       "expiration_year": "25",
    //       "cvv": "123",
    //       "name": "John Doe"
    //     }
    //   }
    // }
    
    const response = await createCustomer(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}