import fs from 'fs';
import path, { resolve } from 'path';
import { parse } from 'csv';
import { rejects } from 'assert';

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

type Stores = {
    storedId: number,
    marketplace: string,
    country: string,
    shopName: string
};

export async function getPendingOrders() {

    const saleOrdersFile = path.resolve('./data/orders.csv');
    const orderTableHeaders = ['id', 'storeId', 'orderId', 'latest_ship_date', 'shipment_status', 'destination', 'items', 'orderValue'];
    const ordersFileContent = fs.readFileSync(saleOrdersFile, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
        parse(ordersFileContent, {
            delimiter: ',',
            columns: orderTableHeaders,
        }, (error, result: SaleOrders[]) => {
            if (error) {
                console.error("Unable to fetch orders from file. For more info ->" + error);
                reject(error);
            } else {
                const pendingOrders = result.filter(order => order.shipment_status === "Pending");
                resolve(pendingOrders);
            }
        });
    });
};

export async function getStores() {

    const saleOrdersFile = path.resolve('./data/stores.csv');
    const orderTableHeaders = ['storeId', 'marketplace', 'country', 'shopName'];
    const ordersFileContent = fs.readFileSync(saleOrdersFile, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
        parse(ordersFileContent, {
            delimiter: ',',
            columns: orderTableHeaders,
        }, (error, result: Stores[]) => {
            if (error) {
                console.error("Unable to fetch orders from file. For more info ->" + error);
                reject(error);
            }
            const stores = result
            resolve(stores)

        });
    })
};
