import HeaderComponent from '../widgets/headerComponent/HeaderComponent';
import TableComponent from '../widgets/tableComponent/TableComponent';
import { useState, useEffect } from "react";

/**
 * MaxMinCropProduction - A component that calculates and displays the crops with the maximum
 * and minimum production for each year based on the provided dataset.
 *
 * @param {Array} dataset - The dataset containing agricultural data.
 */
const MaxMinCropProduction = ({ dataset }) => {
  // State to hold the processed data
  const [aggregatedData, setAggregatedData] = useState({});
  
  // Table headers to be displayed
  const tableHeaders = [
    'Year', 
    'Crop With Maximum Production in that year',
    'Crop With Minimum Production in that year'
  ];

  // Keys corresponding to the data fields to be displayed in the table
  const tableKeys = [
    'year', 
    'maxYieldCrop', 
    'minYieldCrop'
  ];

  // Text to be displayed in the header component
  const headerText = "Maximum and Minimum Production of the Crop";

  useEffect(() => {
    // Object to hold the processed data
    const processedData = {};

    dataset.forEach((item) => {
      const crop = item['Crop Name'];
      const production = parseFloat(item['Crop Production (UOM:t(Tonnes))']) || 0; // Convert production to float, default to 0 if missing
      const year = item.Year.split(',')[1].trim(); // Extract the year

      if (!processedData[year]) {
        // Initialize the year data if it doesn't exist
        processedData[year] = {
          year: year,
          maxYield: production,
          minYield: production,
          maxYieldCrop: crop,
          minYieldCrop: crop
        };
      } else {     
        // Update max yield and crop if current production is higher
        if (production > processedData[year].maxYield) {
          processedData[year].maxYield = production;
          processedData[year].maxYieldCrop = crop;
        }
        // Update min yield and crop if current production is lower
        if (production < processedData[year].minYield) {
          processedData[year].minYield = production;
          processedData[year].minYieldCrop = crop;
        }
      }
    });

    setAggregatedData(processedData); // Set the processed data to state
  }, [dataset]);

  return (
    <div>
      <HeaderComponent headerText={headerText} />
      {
        Object.keys(aggregatedData).length !== 0 && 
        <TableComponent tableData={aggregatedData} tableHeaders={tableHeaders} tableKeys={tableKeys} />
      }
    </div>
  );
}

export default MaxMinCropProduction;
