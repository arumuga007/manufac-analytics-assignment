import { useState, useEffect } from "react";
import TableComponent from "../widgets/tableComponent/TableComponent";
import HeaderComponent from "../widgets/headerComponent/HeaderComponent";

/**
 * AverageCropProduction - A component that calculates and displays the average yield and cultivation area
 * of crops between 1951-2020 based on the provided dataset.
 *
 * @param {Array} dataset - The dataset containing agricultural data.
 */
const AverageCropProduction = ({ dataset }) => {
  // Table headers to be displayed
  const tableHeaders = [
    'Crop',
    'Average Yield of the Crop between 1951-2020',
    'Average Cultivation Area of the Crop between 1951-2020'
  ];

  // Keys corresponding to the data fields to be displayed in the table
  const tableKeys = [
    'cropName',
    'averageCropYield',
    'averageCropCultivationArea'
  ];

  // Text to be displayed in the header component
  const headerText = 'Average Yield and Cultivation Area of the Crop';

  // State to hold the processed data
  const [aggregatedData, setAggregatedData] = useState({});

  useEffect(() => {
    // Object to hold the processed data
    const processedData = {};

    dataset.forEach((item) => {
      const crop = item['Crop Name'];
      const cropYield = item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] ? parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) : 0;
      const cropCultivationArea = item['Area Under Cultivation (UOM:Ha(Hectares))'] ? parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))']) : 0;

      if (!processedData[crop]) {
        // Initialize the crop data if it doesn't exist
        processedData[crop] = {
          cropName: crop,
          totalCropYield: cropYield,
          totalCropCultivationArea: cropCultivationArea,
          count: 1
        };
      } else {
        // Update the crop data if it already exists
        processedData[crop].totalCropYield += cropYield;
        processedData[crop].totalCropCultivationArea += cropCultivationArea;
        processedData[crop].count++;
      }
    });

    // Calculate average yield and cultivation area for each crop
    Object.keys(processedData).forEach((data) => {
      let averageCropYield = processedData[data].totalCropYield / processedData[data].count;
      let averageCropCultivationArea = processedData[data].totalCropCultivationArea / processedData[data].count;
      processedData[data].averageCropYield = averageCropYield.toFixed(3);
      processedData[data].averageCropCultivationArea = averageCropCultivationArea.toFixed(3);
    });

    setAggregatedData(processedData); 
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
};

export default AverageCropProduction;
