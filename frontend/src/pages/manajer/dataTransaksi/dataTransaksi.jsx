import React, { useEffect, useState } from 'react';
import { MdOutlinePerson, MdOutlineTableChart, MdOutlineDateRange } from 'react-icons/md';
import axios from 'axios';

const TransaksiManajer = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data transaksi manajer dari API
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/transaksi/manajer');
        setTransaksi(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Data Transaksi Manajer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transaksi.map((trans, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <MdOutlineDateRange className="text-gray-500 text-2xl mr-2" />
              <span className="text-gray-700 font-semibold">
                Tanggal Transaksi: {new Date(trans.tgl_transaksi).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <MdOutlinePerson className="text-gray-500 text-2xl mr-2" />
              <span className="text-gray-700">Kasir: {trans.user?.nama_user || "Tidak diketahui"}</span>
            </div>

            <div className="flex items-center mb-4">
              <MdOutlineTableChart className="text-gray-500 text-2xl mr-2" />
              <span className="text-gray-700">Meja: {trans.meja?.nomor_meja || "Tidak ada nomor meja"}</span>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Detail Pesanan:</h2>
              <ul className="space-y-2">
                {trans.detail_transaksi.map((detail, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span>{detail.menu.nama_menu} x {detail.qty}</span>
                    <span>Rp {detail.menu.harga * detail.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
              <span className="font-bold text-gray-800">Total Bayar:</span>
              <span className="font-bold text-gray-800">Rp {trans.detail_transaksi.reduce((total, detail) => total + (detail.menu.harga * detail.qty), 0)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransaksiManajer;