import React, { useState } from 'react';
import jsPDF from 'jspdf';

const CetakNotaModal = ({ isOpen, onClose, transaction }) => {
  const [errorMessage, setErrorMessage] = useState('');

  if (!transaction) {
    return null;
  }

  // Function to generate the PDF
  const handlePrint = () => {
    if (transaction.status !== 'lunas') { // Assuming 'lunas' indicates paid
      setErrorMessage('Nota ini belum dibayar. Tidak dapat dicetak.');
      return;
    }

    const doc = new jsPDF();

    // Add cafe name and transaction details
    doc.setFontSize(20);
    doc.text("Cafe Wikusama", 20, 20);
    doc.setFontSize(12);
    doc.text(`Tanggal: ${transaction.tgl_transaksi}`, 20, 30);
    doc.text(`Pelanggan: ${transaction.nama_pelanggan}`, 20, 40);
    doc.text(`Kasir: ${transaction.user ? transaction.user.nama_user : "Tidak diketahui"}`, 20, 50);
    doc.text(`Meja: ${transaction.meja ? transaction.meja.nomor_meja : "Tidak ada nomor meja"}`, 20, 60);
    doc.text("Detail Pesanan:", 20, 70);

    // Add detail orders
    let startY = 80;
    transaction.detail_transaksi.forEach((detail, index) => {
      doc.text(`${index + 1}. ${detail.menu.nama_menu} - Qty: ${detail.qty} - Subtotal: ${detail.qty * detail.menu.harga}`, 20, startY);
      startY += 10;
    });

    // Add total payment
    doc.text(`Total Bayar: ${transaction.detail_transaksi.reduce((total, detail) => total + (detail.qty * detail.menu.harga), 0)}`, 20, startY + 10);

    // Save the PDF
    doc.save(`Nota_Transaksi_${transaction.id_transaksi}.pdf`);

    // Close the modal after printing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose} />
      <div className="relative p-6 w-full max-w-lg max-h-full">
        <div className="relative p-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-8">
          <div className="text-center">
            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              Transaction Details
            </h3>
            {/* Display Transaction Details */}
            <div className="mb-4">
              <p><strong>ID Transaksi:</strong> {transaction.id_transaksi}</p>
              <p><strong>Tanggal:</strong> {transaction.tgl_transaksi}</p>
              <p><strong>Pelanggan:</strong> {transaction.nama_pelanggan}</p>
              <p><strong>Kasir:</strong> {transaction.user ? transaction.user.nama_user : "Tidak diketahui"}</p>
              <p><strong>Meja:</strong> {transaction.meja ? transaction.meja.nomor_meja : "Tidak ada nomor meja"}</p>
              <p><strong>Status:</strong> {transaction.status}</p> {/* Display status */}
            </div>
            <h4 className="font-semibold mb-2">Detail Pesanan:</h4>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Menu</th>
                  <th className="py-2 px-4 border-b text-left">Qty</th>
                  <th className="py-2 px-4 border-b text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transaction.detail_transaksi.map((detail, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{detail.menu.nama_menu}</td>
                    <td className="py-2 px-4">{detail.qty}</td>
                    <td className="py-2 px-4">{detail.qty * detail.menu.harga}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2 px-4 text-right" colSpan="2">Total Bayar:</td>
                  <td className="py-2 px-4">{transaction.detail_transaksi.reduce((total, detail) => total + (detail.qty * detail.menu.harga), 0)}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center space-x-6 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className={`text-white ${transaction.status === 'lunas' ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300' : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-300'}  font-medium rounded-lg text-sm px-6 py-2.5`}
              >
                Print
              </button>
            </div>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakNotaModal;