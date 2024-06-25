import React from 'react';
import { Table } from '@mantine/core';
import styles from './TableComponent.module.css'; // Import CSS for custom styling

/**
 * TableComponent - A reusable table component that accepts data, headers, and keys for dynamic rendering.
 *
 * @param {Object} tableData - The data to be displayed in the table.
 * @param {Array} tableHeaders - The headers to be displayed in the table.
 * @param {Array} tableKeys - The keys corresponding to the data fields to be displayed in the table.
 */

function TableComponent({ tableData, tableHeaders, tableKeys }) {
  return (
    <Table data={tableData} className={styles["custom-table"]}>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th> // Render table headers dynamically
          ))}
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(tableData).map((row, index) => ( // Iterate over the tableData object keys
            <tr key={index}> 
              {
                tableKeys.map((tableKey) => (
                  <td key={tableKey}>{tableData[row][tableKey]}</td> // Render table data dynamically based on keys
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default TableComponent;
