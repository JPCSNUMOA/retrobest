"use client";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function ExportPage() {
    const handleExport = async () => {
        try {
            // Fetch data from the API
            const response = await fetch("/api/export");
            const votes = await response.json();

            if (!response.ok) {
                alert("Failed to fetch data");
                return;
            }

            // Format data for Excel
            const formattedData = votes.map((vote, index) => ({
                ID: index + 1,
                VoteID: vote.voteId,
                CandidateName: vote.candidateName,
                CreatedAt: new Date(vote.createdAt).toLocaleString(),
            }));

            // Convert JSON to Excel
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Votes");

            // Generate Excel file and trigger download
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, "votes.xlsx");
        } catch (error) {
            console.error("Error exporting data:", error);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>DOWNLOAD RESULT</h1>
            <button
                onClick={handleExport}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Export to Excel
            </button>
        </div>
    );
}
