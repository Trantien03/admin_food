// OrderCard.jsx
import React from 'react';

const OrderCard = ({ order }) => (
    <div className="border border-gray-300 rounded-lg p-4 m-2 w-80">
        <div className="flex justify-between items-center mb-2">
            <div>
                <div className="text-red-500 font-bold">TABLE : {order.table}</div>
                <div className="text-gray-500 text-sm">{order.date}</div>
                <div className="text-gray-500 text-sm">Order no: {order.orderNo}</div>
            </div>
            <button className="bg-green-500 text-white px-2 py-1 rounded">Done</button>
        </div>
        <ul className="bg-gray-100 p-2 rounded">
            {order.items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
            ))}
        </ul>
    </div>
);

export default OrderCard;
