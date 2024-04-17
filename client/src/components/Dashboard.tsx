import React, { useEffect, useState } from 'react';
import Orders from './Orders';


export default function Dashboard() {

    let pendingOrders: any;
    let storesList: any;
    const [isLoaded, setIsLoaded] = useState(false);
    const dashboardData: {
        storeId: number,
        country: string;
        marketplace: string;
        shopName: string;
        orderId: string;
        orderValue: number;
        items: number;
        destination: string;
        latest_ship_date: Date;
    }[] = [];

    let [order, setOrder] = useState<Order[]>([]);

    interface Order {
        storeId: number,
        country: string;
        marketplace: string;
        shopName: string;
        orderId: string;
        orderValue: number;
        items: number;
        destination: string;
        latest_ship_date: Date;
    };

    // const test2 = {
    //     country: "AUS",
    //     marketplace: "AMAZON",
    //     shopName: "JB-HIFI",
    //     orderId: "heikedodoo0020dk",
    //     orderValue: 116,
    //     items: 10,
    //     destination: "MElB",
    //     date: "12/11/1993",
    // }

    useEffect(() => {

        // fetch data from 2 apis
        const getOrdersData = async () => {
            try {
                // orders pending
                const pendingOrdersListResponse = await fetch(`http://localhost:8080/orders/pending`);
                pendingOrders = await pendingOrdersListResponse.json();

                // stores
                const storesListResponse = await fetch(`http://localhost:8080/stores`);
                storesList = await storesListResponse.json();

                if (!pendingOrdersListResponse.ok || !storesListResponse.ok) {
                    const message = "Error occured";
                    console.error(message);
                    return;
                }

                getAllPendingOrders();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getAllPendingOrders = async () => {
            try {
                storesList.forEach((storeKey: { storeId: number; country: string; marketplace: string; shopName: string; }) => {
                    pendingOrders.forEach((orderKey: { storeId: number; orderId: string; orderValue: number; items: number; destination: string, latest_ship_date: Date }) => {
                        if (orderKey.storeId === storeKey.storeId) {
                            dashboardData.push({
                                storeId: storeKey.storeId,
                                country: storeKey.country,
                                marketplace: storeKey.marketplace,
                                shopName: storeKey.shopName,
                                orderId: orderKey.orderId,
                                orderValue: orderKey.orderValue,
                                items: orderKey.items,
                                destination: orderKey.destination,
                                latest_ship_date: orderKey.latest_ship_date
                            });
                        };
                    });
                });

                
                console.log("I am done", dashboardData);
                setOrder(dashboardData);
                setIsLoaded(true);
                return;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getOrdersData();
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <>
                <h3 className="text-lg font-semibold p-4">Analytics Dashboard</h3>
                <div className='dashboard-container'>
                    <div className='table-container'>
                        <div className="border rounded-lg overflow-hidden">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm table-auto">
                                    <thead className="[&amp;_tr]:border-b">
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
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                DAYS OVERDUE
                                            </th>
                                        </tr>
                                    </thead>
                                    <Orders order={order} />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}


