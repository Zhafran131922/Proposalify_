import React, { useState, useEffect } from 'react';





const ListProposal = () => {
  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Detail Proposal</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="font-medium">Show</label>
            <select id="entries" className="border border-gray-300 rounded px-2 py-1">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Entries</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Judul Proposal</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Penulis</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">Peningkatan Kompetensi Siswa Menggunakan Software Virtual Tour Bagi SMKN 1 Semarang</td>
                <td className="py-2 px-4 border-b border-gray-200">Nama Mahasiswa</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <span className="inline-block bg-red-500 text-white p-2 rounded-lg">Belum di Revisi</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListProposal;
