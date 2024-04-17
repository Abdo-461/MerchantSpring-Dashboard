import React, { useEffect, useState } from 'react';
import Orders from './Orders';


export default function Dashboard() {

    // an array to hold combined data from fetching apis
    const dashboardData: {
        id: number,
        country: string;
        marketplace: string;
        shopName: string;
        orderId: string;
        orderValue: number;
        items: number;
        destination: string;
        latest_ship_date: Date;
    }[] = [];

    // an interface to use when defining state to hold data to pass to props
    interface DashboardData {
        id: number,
        country: string;
        marketplace: string;
        shopName: string;
        orderId: string;
        orderValue: number;
        items: number;
        destination: string;
        latest_ship_date: Date;
    };

    let pendingOrders: any;
    let storesList: any;
    let [dataOndashboard, setDataOnDashboard] = useState<DashboardData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

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
        // combine 2 data sets to form one data set to show on dashboard
        const getAllPendingOrders = async () => {
            try {
                storesList.forEach((storeKey: { storeId: number; country: string; marketplace: string; shopName: string; }) => {
                    pendingOrders.forEach((orderKey: { id: number; storeId: number; orderId: string; orderValue: number; items: number; destination: string, latest_ship_date: Date }) => {
                        if (orderKey.storeId === storeKey.storeId) {
                            dashboardData.push({
                                id: orderKey.id,
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

                setDataOnDashboard(dashboardData);
                setIsLoaded(true);
                return;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getOrdersData();
    }, []);

    if (!isLoaded) {
        return (
            <div className='isloaded-container'>
                <div className="isloaded-message">Loading...</div>
            </div>
        )
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
                                    <Orders order={dataOndashboard} />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}


