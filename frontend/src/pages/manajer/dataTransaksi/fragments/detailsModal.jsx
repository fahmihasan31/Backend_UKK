import React, { useState } from 'react';
import jsPDF from 'jspdf';

const CetakNotaModal = ({ isOpen, onClose, transaction }) => {
  const [errorMessage, setErrorMessage] = useState('');

  if (!transaction) {
    return null;
  }

  // Function to generate the PDF
  const handlePrint = () => {
    if (transaction.status.toLowerCase() !== 'lunas') {
      setErrorMessage('Nota ini belum dibayar. Tidak dapat dicetak.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255);
    doc.text("Cafe Wikusama", 20, 20);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Jl. Kedai Mewah No. 123, Malang", 20, 28);
    doc.text("Telp: (0341) 123456", 20, 34);
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Nota Pembayaran", 90, 48);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Tanggal     : ${transaction.tgl_transaksi}`, 24, 58);
    doc.text(`Pelanggan   : ${transaction.nama_pelanggan}`, 21, 66);
    doc.text(`Kasir       : ${transaction.user ? transaction.user.nama_user : "Tidak diketahui"}`, 26, 74);
    doc.text(`Meja        : ${transaction.meja ? transaction.meja.nomor_meja : "Tidak ada nomor meja"}`, 26, 82);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Detail Pesanan", 20, 100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("No", 20, 110);
    doc.text("Menu", 30, 110);
    doc.text("Qty", 130, 110, { align: "right" });
    doc.text("Harga", 150, 110, { align: "right" });
    doc.text("Subtotal", 180, 110, { align: "right" });
    doc.setLineWidth(0.3);
    doc.line(20, 113, 190, 113);

    let startY = 120;
    const rowHeight = 10;
    doc.setFont("helvetica", "normal");

    transaction.detail_transaksi.forEach((detail, index) => {
      const subtotal = detail.qty * detail.menu.harga;

      if (startY > 270) {
        doc.addPage();
        startY = 20;
        doc.setFont("helvetica", "bold");
        doc.text("Detail Pesanan", 20, startY);
        startY += 10;
        doc.setFont("helvetica", "normal");
      }

      doc.text(`${index + 1}`, 20, startY);
      doc.text(detail.menu.nama_menu, 30, startY);
      doc.text(`${detail.qty}`, 128, startY, { align: "right" });
      doc.text(`${detail.menu.harga.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}`, 160, startY, { align: "right" });
      doc.text(`${subtotal.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}`, 188, startY, { align: "right" });

      startY += rowHeight;
    });

    doc.setLineWidth(0.5);
    doc.line(20, startY, 190, startY);
    startY += 8;
    const totalBayar = transaction.detail_transaksi.reduce((total, detail) => total + (detail.qty * detail.menu.harga), 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Bayar ", 140, startY);
    doc.text(totalBayar.toLocaleString("id-ID", { style: "currency", currency: "IDR" }), 190, startY, { align: "right" });

    startY += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255); // Set text color to blue
    doc.text(`Status Pembayaran: ${transaction.status}`, 20, startY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    startY += 15;
    doc.setTextColor(0, 0, 0); // Reset text color
    doc.text("Terima kasih atas kunjungan Anda!", 20, startY);
    doc.text("Cafe Wikusama", 20, startY + 5);

    doc.save(`Nota_Transaksi_${transaction.id_transaksi}.pdf`);
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
            <div className="mb-4">
              <p><strong>ID Transaksi:</strong> {transaction.id_transaksi}</p>
              <p><strong>Tanggal:</strong> {transaction.tgl_transaksi}</p>
              <p><strong>Pelanggan:</strong> {transaction.nama_pelanggan}</p>
              <p><strong>Kasir:</strong> {transaction.user ? transaction.user.nama_user : "Tidak diketahui"}</p>
              <p><strong>Meja:</strong> {transaction.meja ? transaction.meja.nomor_meja : "Tidak ada nomor meja"}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
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
                    <td className="py-2 px-4">{(detail.qty * detail.menu.harga).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2 px-4 text-right" colSpan="2">Total Bayar:</td>
                  <td className="py-2 px-4">{transaction.detail_transaksi.reduce((total, detail) => total + (detail.qty * detail.menu.harga), 0).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Print Nota
            </button>
          </div>
          {errorMessage && (
            <p className="mt-4 text-center text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CetakNotaModal;