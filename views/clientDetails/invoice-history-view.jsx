import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  CircleEllipsis,
  CreditCard,
  FileText,
  SendToBack,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function InvoiceHistoryView({ customer }) {
  const exportToExcel = () => {
    const worksheetData = customer.payment_info.payment_history.map(
      (payment, index) => ({
        "Fatura No": `INV-${2023 + index}`,
        Tarih: new Date(payment.date).toLocaleString("tr-TR", {
          timeZone: "Europe/Istanbul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        Açıklama: payment.description,
        Tutar: payment.amount.toFixed(2),
        Durum: payment.status,
      }),
    );

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fatura Gecmisi");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${customer.full_name} Ödeme Geçmişi.xlsx`,
    );
  };
  const methods = [
    { value: "creditCard", label: "Kredi Kartı", icon: <CreditCard /> },
    { value: "cash", label: "Nakit", icon: <Banknote /> },
    { value: "eft", label: "EFT/Havale", icon: <SendToBack /> },
    { value: "other", label: "Diğer", icon: <CircleEllipsis /> },
  ];

  return (
    <Card>
      <CardHeader className="grid grid-cols-2 items-center">
        <CardTitle className="text-lg">Fatura Geçmişi</CardTitle>
        <div className="flex justify-end">
          <Button
            onClick={exportToExcel}
            className="w-28 bg-blue-600 text-white hover:bg-blue-700"
          >
            Excel'e Aktar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <div className="max-h-56 overflow-y-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutar
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ödeme Yöntemi
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.payment_info.payment_history.map((payment, index) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.amount.toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      ₺
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(() => {
                        const method = methods.find(
                          (m) => m.value === payment.method,
                        );
                        return method ? (
                          <div className="flex items-center space-x-2">
                            {method.icon}
                            <span>{method.label}</span>
                          </div>
                        ) : (
                          <span>{payment.method}</span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
