'use client';

import { useState, useEffect } from 'react';

export default function SubscriptionFlow() {
    // All other state variables remain the same
    const [step, setStep] = useState(1);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        paymentDetails: {}
    });
    const [productInfo, setProductInfo] = useState(null);
    const [planInfo, setPlanInfo] = useState(null);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // All fetch methods remain the same
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/payment-methods?country=IL&currency=ILS');
            const result = await response.json();
            setPaymentMethods(result.data || []);
        } catch (err) {
            setError('Failed to load payment methods');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setStep(2);
    };

    // The key change is in this function
    const handleCustomerInfoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Try a different approach to formatting the payment method
            const customerData = {
                name: customerInfo.name,
                email: customerInfo.email,
                // Providing payment_method without wrapping it in an array
                payment_method: {
                    type: selectedPaymentMethod.type,
                    fields: customerInfo.paymentDetails,
                    complete_payment_url: 'https://complete.rapyd.net/',
                    error_payment_url: 'https://error.rapyd.net/'
                }
            };

            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData)
            });

            const result = await response.json();

            if (result.data && result.data.id) {
                setCustomerInfo(prev => ({ ...prev, id: result.data.id }));
                const customerId = result.data.id;
                await createProduct(customerId);
            } else {
                throw new Error('Failed to create customer');
            }
        } catch (err) {
            setError(err.message || 'Failed to create customer');
            console.error("Full error:", err);
        } finally {
            setLoading(false);
        }
    };

    // All other methods remain the same
    const createProduct = async (customerId) => {
        try {
            const productData = {
                name: "Menu Subscription",
                type: "service"
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (result.data && result.data.id) {
                setProductInfo(result.data);
                await createPlan(result.data.id, customerId);
            } else {
                throw new Error('Failed to create product');
            }
        } catch (err) {
            setError(err.message || 'Failed to create product');
        }
    };

    const createPlan = async (productId, customerId) => {
        try {
            const planData = {
                currency: "ILS",
                interval: "month",
                product: productId,
                amount: 50,
                nickname: "Monthly Menu Subscription",
                usage_type: "licensed",
            };

            const response = await fetch('/api/plans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData)
            });

            const result = await response.json();

            if (result.data && result.data.id) {
                setPlanInfo(result.data);
                await createSubscription(result.data.id, customerId);
            } else {
                throw new Error('Failed to create plan');
            }
        } catch (err) {
            setError(err.message || 'Failed to create plan');
        }
    };

    const createSubscription = async (planId, customerId) => {
        try {
            
            const subscriptionData = {
                customer: customerId,
                billing: "pay_automatically",
                subscription_items: [
                    {
                        plan: planId,
                        quantity: 1
                    }
                ]
            };

            const response = await fetch('/api/subscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscriptionData)
            });

            const result = await response.json();

            if (result.data && result.data.id) {
                setSubscriptionInfo(result.data);
                setStep(3);
                setError(null);
            } else {
                throw new Error('Failed to create subscription');
            }
        } catch (err) {
            setError(err.message || 'Failed to create subscription');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentDetailChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            paymentDetails: {
                ...prev.paymentDetails,
                [name]: value
            }
        }));
    };

    const handleCombinedChange = (event) => {
        handleInputChange(event);
        handlePaymentDetailChange(event);
    };

    // The UI remains the same
    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Subscription Setup</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {step === 1 && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Select Payment Method</h2>
                    {loading ? (
                        <p>Loading payment methods...</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.type}
                                    className="border p-4 rounded cursor-pointer hover:bg-gray-50"
                                    onClick={() => handlePaymentMethodSelect(method)}
                                >
                                    <p className="font-medium">{method.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {step === 2 && selectedPaymentMethod && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                    <form onSubmit={handleCustomerInfoSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleCombinedChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <h3 className="font-semibold mb-2">Payment Details</h3>

                        {selectedPaymentMethod.type.includes('card') && (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        name="number"
                                        onChange={handlePaymentDetailChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-1">Exp Month</label>
                                        <input
                                            type="text"
                                            name="expiration_month"
                                            onChange={handlePaymentDetailChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Exp Year</label>
                                        <input
                                            type="text"
                                            name="expiration_year"
                                            onChange={handlePaymentDetailChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            onChange={handlePaymentDetailChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Subscribe'}
                        </button>
                    </form>
                </div>
            )}

            {step === 3 && subscriptionInfo && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <h2 className="text-xl font-semibold mb-2">Subscription Created!</h2>
                </div>
            )}
        </div>
    );
}