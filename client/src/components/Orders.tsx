import React from 'react';

interface Order {
    id: number,
    country: string,
    marketplace: string;
    shopName: string;
    orderId: string;
    orderValue: number;
    items: number;
    destination: string;
    latest_ship_date: Date;
}

interface OrdersProps {
    order: Order[];
}

const Orders = ({order}: OrdersProps) => {
    return (
        <tbody>
            {order.map((item: { id: number; country: string; marketplace: string; shopName: string; orderId: string; orderValue: number; items: number; destination: string; latest_ship_date: Date }) => (
                <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.country}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.marketplace}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.shopName}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.orderId}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.orderValue}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.items}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.destination}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        {item.latest_ship_date}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Orders;
