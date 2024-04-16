import fs from 'fs';
import path from 'path';
import { parse } from 'csv';

type SaleOrders = {
    id: number,
    storeId: number,
    orderId: string,
    latest_ship_date: Date,
    shipment_status: string,
    destination: string,
    items: number,
    orderValue: number
};

export async function getPendingOrders() {

    const saleOrdersFile = path.resolve('./data/orders.csv');
    const orderTableHeaders = ['id', 'storeId', 'orderId', 'latest_ship_date', 'shipment_status', 'destination', 'items', 'orderValue'];
    const ordersFileContent = fs.readFileSync(saleOrdersFile, { encoding: 'utf-8' });

    try {
        parse(ordersFileContent, {
            delimiter: ',',
            columns: orderTableHeaders,
        }, (error, result: SaleOrders[]) => {
            if (error) {
                console.error("Unable to fetch orders from file. For more info ->" + error);
            }
            
            const pendingOrders = result.filter(shipmentStatus => shipmentStatus.shipment_status === "Pending");
    
            console.log("orders" , pendingOrders);
    
        });

    }catch(error) {
        console.error(error);
    }
};

export async function getStores() {

    const saleOrdersFile = path.resolve('./data/stores.csv');
    const orderTableHeaders = ['storeId', 'marketplace', 'country', 'shopName'];
    const ordersFileContent = fs.readFileSync(saleOrdersFile, { encoding: 'utf-8' });

    try {
        parse(ordersFileContent, {
            delimiter: ',',
            columns: orderTableHeaders,
        }, (error, result: SaleOrders[]) => {
            if (error) {
                console.error("Unable to fetch orders from file. For more info ->" + error);
            }
            
            const stores = result
    
            console.log("orders" , stores);
    
        });

    }catch(error) {
        console.error(error);
    }
};
