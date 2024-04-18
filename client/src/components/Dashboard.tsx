import React, { useEffect, useState } from 'react';
import Orders from './Orders';
import Pagination from './Pagination';
import { calculateDaysOverdue } from "./helper";


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
		latest_ship_date: number;
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
		latest_ship_date: number;
	};

	// for manipulating and displaying data
	let pendingOrders: any;
	let storesList: any;
	let [dataOnDashboard, setDataOnDashboard] = useState<DashboardData[]>([]);

	const [isLoaded, setIsLoaded] = useState(false);

	// Pagination variables
	let indexOfLastRecord: any;
	let indexOfFirstRecord: any;
	let slicedData: any[] = [];
	const [nPages, setNPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(7);

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
							latest_ship_date: calculateDaysOverdue(orderKey.latest_ship_date)
						});
					};
				});
			});

			indexOfLastRecord = currentPage * recordsPerPage;
			indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
			slicedData = dashboardData.slice(indexOfFirstRecord, indexOfLastRecord);

			setDataOnDashboard(slicedData);
			setNPages(Math.ceil(dashboardData.length / recordsPerPage)); // <- calculate number of pages
			setIsLoaded(true);
			return;

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

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
		
		getOrdersData();
	}, []);

	if (!isLoaded) {
		return (
			<div className='isloaded-container'>
				<div className="isloaded-message">Loading...</div>
				<div className="isloaded-message">This might take a while. Hang on!</div>
			</div>
		)
	}
	else {
		return (
			<>
				<div className='dashboard-container'>
					<div className='table-container'>
						<div className="border rounded-lg overflow-hidden">
							<div className="relative w-full overflow-auto">
								<Orders order={dataOnDashboard} />
								{/* <Pagination
										nPages={nPages}
										currentPage={currentPage}
										setCurrentPage={setCurrentPage}
									/> */}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}


