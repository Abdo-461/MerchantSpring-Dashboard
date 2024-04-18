// This file contains helper methods to assist with some data manipulation on the front-end


// a method to calculate days overdue
export function calculateDaysOverdue(latestShipDate: Date): number {

    const dateToday = new Date ();
    const shipDate = convertDateFormat(latestShipDate.toString());
    let differenceInTime = dateToday.getTime() - new Date(shipDate).getTime();
    let differenceInDays = Math.round(differenceInTime/ (1000 * 3600 * 24));
    
    return differenceInDays;
}

// a method to convert date format from dd/mm/yyyy to mm/dd/yyyy
export function convertDateFormat(inputDate: string): string {

    const [day, month, year] = inputDate.split('/');
    const newDateString = `${month}/${day}/${year}`;

    return newDateString;
}