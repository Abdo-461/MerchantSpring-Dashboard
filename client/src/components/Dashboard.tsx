import React, { useEffect, useState } from 'react';
import Orders from './Orders';
import Pagination from './Pagination';


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
								latest_ship_date: calculateDaysOverdue(orderKey.latest_ship_date)
							});
						};
					});
				});

				console.log(dashboardData);

				indexOfLastRecord = currentPage * recordsPerPage;
				indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
				slicedData = dashboardData.slice(indexOfFirstRecord, indexOfLastRecord);

				console.log("slice bitch", slicedData);

				setDataOnDashboard(slicedData);
				setNPages(Math.ceil(dashboardData.length / recordsPerPage)); // <- calculate number of pages
				setIsLoaded(true);
				return;

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		// a method to calculate days overdue
		function calculateDaysOverdue(latestShipDate: Date): number {

			const dateToday = new Date ();
			const shipDate = convertDateFormat(latestShipDate.toString());
			let differenceInTime = dateToday.getTime() - new Date(shipDate).getTime();
			let differenceInDays = Math.round(differenceInTime/ (1000 * 3600 * 24));
			
			return differenceInDays;
		}

		// a method to convert date format from dd/mm/yyyy to mm/dd/yyyy
		function convertDateFormat(inputDate: string): string {

			const [day, month, year] = inputDate.split('/');
			const newDateString = `${month}/${day}/${year}`;
		
			return newDateString;
		}

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
											<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
												DAYS OVERDUE
											</th>
										</tr>
									</thead>
									<Orders order={dataOnDashboard} />
								</table>
								<Pagination
										nPages={nPages}
										currentPage={currentPage}
										setCurrentPage={setCurrentPage}
									/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}


