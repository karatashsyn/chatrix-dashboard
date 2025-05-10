import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ServicePriceHistoryView({ customer }) {
  const { treatments } = customer.portfolio.treatments;

  const exportToExcel = () => {
    const worksheetData = customer.portfolio.treatments.map((treatment) => ({
      Tarih: new Date(treatment.date).toLocaleString("tr-TR", {
        timeZone: "Europe/Istanbul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      Tedavi: treatment.name,
      Tutar: treatment.price.toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hizmetler");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${customer.full_name} Servis Ücretleri.xlsx`,
    );
  };
  return (
    <Card>
      <CardHeader className="grid grid-cols-2 items-center">
        <CardTitle className="text-lg">Hizmet Geçmişi</CardTitle>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tedavi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
              </tr>
            </thead>
          </table>
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.portfolio.treatments.map((treatment, index) => (
                  <tr key={treatment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(treatment.date).toLocaleString("tr-TR", {
                        timeZone: "Europe/Istanbul",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {treatment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {treatment.price.toFixed(2)} ₺
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
