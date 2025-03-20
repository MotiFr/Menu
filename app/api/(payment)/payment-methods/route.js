// app/api/payment-methods/route.js

import { NextResponse } from 'next/server';
import { getPaymentMethodsByCountry } from '@/lib/rapyd';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || 'IL';
  const currency = searchParams.get('currency') || 'ILS';
  
  try {
    const response = await getPaymentMethodsByCountry(country, currency);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}