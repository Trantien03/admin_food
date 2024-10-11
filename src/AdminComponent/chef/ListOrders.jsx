import React from 'react';
import OrderCard from './OrderCard'; 

const ListOrders = ({ orders }) => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="text-red-500 font-bold text-lg">Status</div>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Check all</button>
            </div>
            <div className="flex flex-wrap">
                {orders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                ))}
            </div>
        </div>
    );
}

export default ListOrders;

