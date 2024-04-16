import React, { useEffect, useState } from 'react'


export default function Dashboard() {

    // interface PendingOrderListProps {
    //     ordersList: {
    //         marketplace: string,
    //         store: string,
    //         orderId: string,
    //         orderValue: string,
    //         items: number,
    //         destination: string,
    //         date: Date
    //     }
    // }

    // type Stores = {
    //     storeId: number,
    //     marketplace: string,
    //     country: string,
    //     shopName: string
    // };

    // interface OrdersTest {
    //     id: number;
    //     storeId: number;
    //     orderId: string;
    //     latest_ship_date: Date;
    //     shipment_status: string;
    //     destination: string;
    //     items: number;
    //     orderValue: number;
    // }

    // a small component to display the contents of the table
    // const pendingOrderList: React.FC<PendingOrderListProps> = (props) => (
    //     <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.marketplace}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.store}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.orderId}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.orderValue}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.items}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.destination}
    //         </td>
    //         <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    //             {props.ordersList.date}
    //         </td>
    //     </tr>
    // );

    const [isLoaded, setIsLoaded] = useState(false);
    let pendingOrders: any;
    let storesList: any;


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

                console.log("1st dataset", pendingOrders);
                console.log("2nd dataset", storesList);

                getAllPendingOrders();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        const dashboardData: { country: string, marketplace: string, shopName: string, orderId: string, orderValue: number, items: number, destination: string }[] = [];
        const getAllPendingOrders = async () => {
            let storeKey: any;
            let orderKey: any;
            try {
                storesList.forEach((storeKey: { storeId: number; country: string; marketplace: string; shopName: string; }) => {
                    pendingOrders.forEach((orderKey: { storeId: number; orderId: string; orderValue: number; items: number; destination: string }) => {
                        if (orderKey.storeId === storeKey.storeId) {
                            dashboardData.push({
                                country: storeKey.country,
                                marketplace: storeKey.marketplace,
                                shopName: storeKey.shopName,
                                orderId: orderKey.orderId,
                                orderValue: orderKey.orderValue,
                                items: orderKey.items,
                                destination: orderKey.destination
                            });
                        };
                    });
                });

                setIsLoaded(true);
                console.log("I am done", dashboardData);
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
            <><h2>hi</h2>
                <div>I am done</div>
            </>
        );
    }

}


