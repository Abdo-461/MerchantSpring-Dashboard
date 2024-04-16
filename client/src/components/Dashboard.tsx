import React, { useEffect, useState } from 'react'


export default function Dashboard() {

    interface PendingOrderListProps {
        ordersList: {
            marketPlace: string,
            store: string,
            orderId: string,
            orderValue: string,
            items: number,
            destination: string,
            date: Date
        }
    }

    interface Stores {
        storeId: number,
        marketplace: string,
        country: string,
        shopNmae: string,
    }

    interface Orders {
        id: number,
        storeId: number,
        latest_ship_date: Date,
        shipment_status: string,
        destination: string,
        items: number,
        orderValue: number
    }

    // a small component to display the contents of the table
    const pendingOrderList: React.FC<PendingOrderListProps> = (props) => (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.marketPlace}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.store}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.orderId}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.orderValue}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.items}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.destination}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {props.ordersList.date}
            </td>
        </tr>
    );

    const [pendingOrders, setPendingOrders] = useState<any>();
    const [storeList, setStoreList] = useState<any>([]);
    const [listOfPendingOrders, setListOfPendingOrders] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    let newList: any [];
    let lists;

    let count;

    useEffect(() => {

        // fetch data from 2 apis
        const getOrdersData = async () => {
            try {
                // orders pending
                const pendingOrdersListResponse = await fetch(`http://localhost:8080/orders/pending`);
                const pendingOrders = await pendingOrdersListResponse.json();

                // stores
                const storesListResponse = await fetch(`http://localhost:8080/stores`);
                const storesList = await storesListResponse.json();

                if (!pendingOrdersListResponse.ok || !storesListResponse.ok) {
                    const message = "Error occured";
                    console.error(message);
                    return;
                }

                console.log(pendingOrders);
                console.log(storesList);

                // Set data and mark as loaded only when both fetches are successful
                setPendingOrders(pendingOrders);
                setStoreList(storesList);

                getAllPendingOrders();

                setIsLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getAllPendingOrders = async () => {
            try {

                for(const key1 of storeList) {
                   newList.push(key1[1].storeId)
                }

                setListOfPendingOrders(newList);

                console.log("i am here", newList);                

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


