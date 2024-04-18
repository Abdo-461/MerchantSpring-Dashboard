import React, { useEffect, useState } from 'react';

interface OrdersProps {
    order: any;
}

const Orders = ({ order }: OrdersProps) => {
    const [sortedOrder, setSortedOrder] = useState(order);
    const [isAscending, setIsAscending] = useState(true);

    const sortByLatestShipDate = (asc: boolean) => {
        const sorted = [...sortedOrder].sort((a, b) => {
            if (asc) {
                return a.latest_ship_date - b.latest_ship_date
            } else {
                return b.latest_ship_date - a.latest_ship_date
            }
        });
        setSortedOrder(sorted);
    };

    useEffect(() => {
        sortByLatestShipDate(isAscending);
    }, [order, isAscending]);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    return (

        <table className="w-full caption-bottom text-sm table-auto">
            <thead className="[&amp;_tr]:border-b table-head">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        MARKETPLACE
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        STORE
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        ORDER ID
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        ORDER VALUE
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        ITEMS
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        DESTINATION
                    </th>
                    <button onClick={toggleSortOrder}>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            DAYS OVERDUE {isAscending ? '^' : 'ˇ'}
                        </th>
                    </button>
                </tr>
            </thead>
            <tbody>
                {sortedOrder.map((item: { id: number; country: string; marketplace: string; shopName: string; orderId: string; orderValue: number; items: number; destination: string; latest_ship_date: number }) => (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                            {item.country}-{item.marketplace}
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
        </table>
    );
};

export default Orders;
