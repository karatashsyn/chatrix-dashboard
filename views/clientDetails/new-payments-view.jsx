import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  CircleEllipsis,
  CreditCard,
  HandCoins,
  Loader2,
  SendToBack,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function NewPaymenstView({ customer }) {
  const methods = [
    { value: "creditCard", label: "Kredi Kartı", icon: <CreditCard /> },
    { value: "cash", label: "Nakit", icon: <Banknote /> },
    { value: "eft", label: "EFT/Havale", icon: <SendToBack /> },
    { value: "other", label: "Diğer", icon: <CircleEllipsis /> },
  ];
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [customPayment, setCustomPayment] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddPayment = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!paymentAmount || !paymentDescription) {
        toast.error("Lütfen tüm alanları doldurun.");
        return;
      }
      if (paymentMethod === "custom" && !customPayment) {
        toast.error("Lütfen özel ödeme yöntemini belirtin.");
        return;
      }
      // const res = await api.post("/payments", {
      //   paymentMethod,
      //   customPayment,
      //   paymentAmount,
      //   paymentDescription,
      // });
      // Simulate API call
      //TODO: Uncomment the above line and remove the below line
      await new Promise((resolve) => setTimeout(resolve, 200));
      // Handle success
      customer;
      toast.success("Ödeme başarıyla eklendi.");
      setPaymentMethod("creditCard");
      setCustomPayment("");
      setPaymentAmount("");
      setPaymentDescription("");
    } catch (error) {
      toast.error("Ödeme eklenirken bir hata oluştu.");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Yeni Ödeme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-2">
            Ödeme Yöntemi Seçiniz
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap bg-gray-100 p-2 rounded-md">
            {methods.map((method) => (
              <button
                key={method.value}
                type="button"
                className={`px-4 py-2 rounded-md text-sm border sm:flex-1 w-full sm:w-auto ${
                  paymentMethod === method.value
                    ? "bg-white text-black shadow-sm"
                    : "bg-gray-100 text-gray-600 border-transparent"
                }`}
                onClick={() => {
                  setPaymentMethod(method.value);
                }}
              >
                <div className="flex items-center justify-center w-full">
                  <div className="mr-2">{method.icon}</div>
                  <span className="text-sm">{method.label}</span>
                </div>
              </button>
            ))}
          </div>

          {paymentMethod === "other" && (
            <input
              type="text"
              className="mt-3 p-3 border rounded-md"
              placeholder="Lütfen ödeme yöntemini giriniz"
              value={customPayment}
              onChange={(e) => setCustomPayment(e.target.value)}
              required
            />
          )}
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-500 mb-2">Ödeme Tutarı</label>
          <input
            type="number"
            className="p-3 border rounded-md w-full"
            placeholder="0.00"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-500 mb-2">Açıklama</label>
          <textarea
            className="p-3 border rounded-md w-full"
            placeholder="Ödeme açıklaması"
            value={paymentDescription}
            onChange={(e) => setPaymentDescription(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <Button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            onClick={() => handleAddPayment()}
            disabled={isLoading}
          >
            {!isLoading && <HandCoins className="mr-2 h-4 w-4" />}
            {isLoading ? <Loader2 className="animate-spin" /> : "Ödeme Ekle"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
