// components/orders/InvoicePrint.tsx
'use client';

import React from 'react';
import { ChefHat, Phone, MapPin, Calendar } from 'lucide-react';

interface InvoicePrintProps {
  order: any;
  restaurantInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    vatNo: string;
  };
}

export default function InvoicePrint({ order, restaurantInfo }: InvoicePrintProps) {
  return (
    <div className="print-invoice p-8 max-w-4xl mx-auto bg-white text-black">
      {/* Restaurant Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">{restaurantInfo.name}</h1>
        <p className="text-gray-600 mb-1">{restaurantInfo.address}</p>
        <p className="text-gray-600 mb-1">Phone: {restaurantInfo.phone} | Email: {restaurantInfo.email}</p>
        <p className="text-gray-600">VAT No: {restaurantInfo.vatNo}</p>
      </div>

      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
          <p className="text-gray-600">Order #{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {new Date().toLocaleDateString('en-BD')}</p>
          <p className="text-gray-600">Time: {new Date().toLocaleTimeString('en-BD')}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Bill To:</h3>
          <p className="font-semibold">{order.customer}</p>
          <p className="text-gray-600">{order.deliveryAddress}</p>
          <p className="text-gray-600">{order.customerPhone}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">Order Info:</h3>
          <p><span className="font-semibold">Order Type:</span> {order.deliveryType}</p>
          <p><span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
          <p><span className="font-semibold">Status:</span> {order.status}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left py-3">Item</th>
            <th className="text-right py-3">Qty</th>
            <th className="text-right py-3">Price</th>
            <th className="text-right py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item: any, index: number) => (
            <tr key={index} className="border-b">
              <td className="py-3">{item.name}</td>
              <td className="text-right py-3">{item.quantity}</td>
              <td className="text-right py-3">৳{item.price}</td>
              <td className="text-right py-3">৳{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="ml-auto w-64">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>৳{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-green-600">-৳{order.discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>৳{order.deliveryCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (5%):</span>
            <span>৳{order.vat}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>৳{order.total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t text-center text-gray-600 text-sm">
        <p className="mb-2">Thank you for your order!</p>
        <p>For any queries, contact us at {restaurantInfo.phone}</p>
        <p className="mt-4">Generated on: {new Date().toLocaleString('en-BD')}</p>
      </div>
    </div>
  );
}