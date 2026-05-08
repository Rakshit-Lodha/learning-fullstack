'use client';
import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function Home() {
    const [tickets, setTickets] = useState < string[][] > ([]);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const rows = text.split('\n').map(row => row.split(','))
    setTickets(rows)
  }
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="flex items-center justify-between p-4">
        <span className="text-xl font-bold">AI Ticket Classifier</span>
      </nav>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl font-bold">Upload CSV</h1>
            <input type="file" accept=".csv" className="hidden" id="csv-upload" onChange={handleFileChange}/>
            <button onClick={() => document.getElementById('csv-upload')?.click()} className="bg-white text-slate-950 px-6 py-3 rounded-md font-semibold">Upload</button>  
            {tickets.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tickets[0].map((header, index) => (
                                <TableHead key = {index} className = "text-white">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.slice(1).map((row, rowIndex) => (
                            <TableRow key = {rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key = {cellIndex} className = "text-white">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div> 
    </main>
  );
}


