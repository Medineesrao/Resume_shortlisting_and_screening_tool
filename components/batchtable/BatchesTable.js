"use client"; // Required for useState in Next.js App Router

import { useState } from "react";
import "./Table.css";

export default function BatchesTable() {
  const [batches, setBatches] = useState([
    { name: "Batch 1", id: "BATCH-1" },
    { name: "Batch 2", id: "BATCH-2" },
    { name: "Batch 3", id: "BATCH-3" },
  ]); // Example batches for search

  const [selectedBatch, setSelectedBatch] = useState(""); // Stores selected batch
  const [searchList, setSearchList] = useState(""); // Stores search text

  return (
    <div className="table-container">
      <div className="search-container">
        {/* Dropdown for selecting batch */}
        <select
          className="search-box dropdown"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">Select Batch </option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.name}>
              {batch.name}
            </option>
          ))}
        </select>

        {/* Search List Input */}
        <input
          type="text"
          placeholder="Search List..."
          value={searchList}
          onChange={(e) => setSearchList(e.target.value)}
          className="search-box"
        />
      </div>

      {batches.length > 0 && (
        <table className="batch-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch Name</th>
              <th>Batch ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches
              .filter((batch) =>
                batch.name.toLowerCase().includes(searchList.toLowerCase())
              )
              .map((batch, index) => (
                <tr key={batch.id} className="batch-row">
                  <td>{index + 1}</td>
                  <td>{batch.name}</td>
                  <td>{batch.id}</td>
                  <td><button className="open-btn">Open</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
