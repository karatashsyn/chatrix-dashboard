import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import api from "@/api/_axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function TotalPaymentsView({ customer, isLoading }) {
  const { payment_history } = customer.payment_info;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ödeme Özeti</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {!isLoading && (
          <div className="space-y-2-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm text-gray-500">Toplam Ödenen</h4>
                <p className="text-2xl font-bold text-green-600">
                  {payment_history
                    .reduce((sum, payment) => sum + payment.amount, 0)
                    .toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                  ₺
                </p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Bekleyen Ödemeler</h4>
                <p className="text-2xl font-bold text-amber-600 text-end">
                  {(
                    customer.total_debt -
                    payment_history.reduce(
                      (sum, payment) => sum + payment.amount,
                      0,
                    )
                  ).toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ₺
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
