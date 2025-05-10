import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  CreditCard,
  Calendar,
  MessageSquare,
  Instagram,
  MessageCircle,
  FileText,
  User,
  Clock,
  Info,
  CalendarDays,
  CreditCardIcon as PaymentIcon,
  WebcamIcon as ChatIcon,
} from "lucide-react";
import MainLayout from "@/components/custom/layout/main-layout";
import TotalPaymentsView from "@/views/clientDetails/total-payments-view";
import NewPaymenstView from "@/views/clientDetails/new-payments-view";
import InvoiceHistoryView from "@/views/clientDetails/invoice-history-view";
import ServicePriceHistoryView from "@/views/clientDetails/service-price-history-view";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Mock data based on the schema
const customerData = {
  _id: "123456789",
  full_name: "Maria Rodriguez",
  email: "maria.rodriguez@example.com",
  phone: "+1 (555) 123-4567",
  profile_pic: "/placeholder.svg?height=200&width=200",
  clinic_id: "clinic123",
  initial_channel: "instagram",
  total_debt: 2500.0,
  channels: {
    instagram: {
      username: "maria.rodriguez",
      name: "Maria R.",
      thread_id: "ig-thread-123",
      profile_info: {
        bio: "Living life to the fullest",
        followers: 1240,
      },
      messages: [
        {
          id: "ig1",
          content:
            "Merhaba, diş beyazlatma için bir danışma randevusu almak istiyorum.",
          timestamp: "2023-10-15T14:30:00Z",
          sender: "customer",
        },
        {
          id: "ig2",
          content:
            "Merhaba Maria! Size diş beyazlatma konusunda yardımcı olmaktan memnuniyet duyarız. Randevu almak ister misiniz?",
          timestamp: "2023-10-15T14:45:00Z",
          sender: "clinic",
        },
        {
          id: "ig3",
          content:
            "Evet, harika olur. Önümüzdeki hafta hangi saatlerde müsaitsiniz?",
          timestamp: "2023-10-15T15:00:00Z",
          sender: "customer",
        },
        {
          id: "ig4",
          content:
            "Salı günü saat 14:00'te veya Perşembe günü saat 10:00'da boş zamanımız var. Hangisi sizin için daha uygun?",
          timestamp: "2023-10-15T15:15:00Z",
          sender: "clinic",
        },
        {
          id: "ig5",
          content: "Perşembe saat 10:00 mükemmel olur.",
          timestamp: "2023-10-15T15:30:00Z",
          sender: "customer",
        },
      ],
      first_message_date: "2023-10-15T14:30:00Z",
      last_message_date: "2023-10-15T15:30:00Z",
      last_updated: "2023-10-15T15:30:00Z",
      phone_giving_date: "2023-10-15T15:00:00Z",
    },
    whatsapp: {
      profile_info: {
        status: "Müsait",
        about: "Diş hekiminde",
      },
      messages: [
        {
          id: "wa1",
          content:
            "Merhaba, ben Instagram'dan Maria. Perşembe günkü randevumu teyit etmek istiyorum.",
          timestamp: "2023-10-16T09:00:00Z",
          sender: "customer",
        },
        {
          id: "wa2",
          content:
            "Merhaba Maria! Evet, Perşembe günü saat 10:00'daki randevunuz onaylandı. Sizi görmek için sabırsızlanıyoruz!",
          timestamp: "2023-10-16T09:15:00Z",
          sender: "clinic",
        },
        {
          id: "wa3",
          content:
            "Harika, teşekkür ederim! Bu arada, beyazlatma işlemi genellikle ne kadar sürer?",
          timestamp: "2023-10-16T09:30:00Z",
          sender: "customer",
        },
        {
          id: "wa4",
          content:
            "İşlem genellikle 60-90 dakika sürer. Geldiğinizde tüm detayları sizinle paylaşacağız.",
          timestamp: "2023-10-16T09:45:00Z",
          sender: "clinic",
        },
        {
          id: "wa5",
          content: "Mükemmel, bilgi için teşekkürler!",
          timestamp: "2023-10-16T10:00:00Z",
          sender: "customer",
        },
      ],
      first_message_date: "2023-10-16T09:00:00Z",
      last_message_date: "2023-10-16T10:00:00Z",
      last_updated: "2023-10-16T10:00:00Z",
      phone_giving_date: "2023-10-15T15:00:00Z",
    },
  },
  portfolio: {
    appointmentCount: 2,
    appointments: [
      {
        id: "apt1",
        date: "2023-10-19T10:00:00Z",
        type: "Danışma",
        status: "Onaylandı",
        notes: "Diş beyazlatma için ilk danışma",
      },
      {
        id: "apt2",
        date: "2023-10-26T14:00:00Z",
        type: "Tedavi",
        status: "Planlandı",
        notes: "Diş beyazlatma işlemi",
      },
    ],
    treatments: [
      {
        name: "Diş Beyazlatma",
        date: "2023-10-16T09:00:00Z",
        status: "Planlandı",
        price: 1000,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
      {
        name: "Implant",
        date: "2023-11-23",
        status: "Tamamlandı",
        price: 1500,
      },
    ],
  },
  // Additional payment info (not in original schema)
  payment_info: {
    payment_history: [
      {
        id: "pay1",
        amount: 1000.0,
        date: "2023-10-16",
        description: "Danışma ücreti",
        method: "creditCard",
      },
      {
        id: "pay2",
        amount: 350.0,
        date: "2024-10-16",
        description: "Diş Beyazlatma",
        method: "cash",
      },
      {
        id: "pay1",
        amount: 1000.0,
        date: "2023-10-16",
        description: "Danışma ücreti",
        method: "other",
      },
      {
        id: "pay1",
        amount: 1000.0,
        date: "2023-10-16",
        description: "Danışma ücreti",
        method: "eft",
      },
    ],
  },

  // Chat summary (not in original schema)
  chat_summary: {
    main_issue: "Diş Beyazlatma",
    key_points: [
      "Profesyonel diş beyazlatma ile ilgileniyor",
      "İşlem süresi hakkında endişeli",
      "Hassasiyet sorunu bildirmedi",
      "İlk kez beyazlatma yaptıracak hasta",
    ],
    sentiment: "Olumlu",
    last_updated: "2023-10-16T10:00:00Z",
  },
};

export default function CustomerDetail() {
  const params = useParams();
  const customerId = params.id;

  // In a real application, you would fetch the customer data based on the ID
  const customer = customerData;

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Format chat timestamp
  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      hour: "numeric",
      minute: "numeric",
    });
  };
  const [isDebtLoading, setIsDebtLoading] = useState(false);
  const fetchTotalDebt = async () => {
    setIsDebtLoading(true);
    try {
      //TODO: uncomment 2 lines below for prod
      // const res = await api.get(`/get-payments/${id}`);
      // toast.message(`Status: ${res.status}`);

      //simulate api call
      //TODO: comment 2 lines below for prod
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.message(`Status: ${200}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Bilinmeyen bir hata oluştu.",
      );
    } finally {
      setIsDebtLoading(false);
    }
  };
  useEffect(() => {
    fetchTotalDebt();
  }, []);
  return (
    <div className="container mx-auto py-6">
      {/* Customer Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage
              src={customer.profile_pic || "/placeholder.svg"}
              alt={customer.full_name}
            />
            <AvatarFallback>
              {customer.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{customer.full_name}</h1>
            <div className="flex items-center space-x-2 text-gray-500">
              <Badge variant="outline" className="text-xs">
                Müşteri ID: {customerId}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Ara
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mesaj
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Randevu
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Genel Bilgiler
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Randevular
          </TabsTrigger>
          <TabsTrigger value="treatments" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Tedaviler
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <PaymentIcon className="h-4 w-4 mr-2" />
            Ödemeler
          </TabsTrigger>
          <TabsTrigger value="chats" className="flex items-center">
            <ChatIcon className="h-4 w-4 mr-2" />
            Görüşmeler
          </TabsTrigger>
        </TabsList>

        {/* General Info Tab */}
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.channels.instagram && (
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2 text-gray-500" />
                      <span>@{customer.channels.instagram.username}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Problem/Question Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Müşteri Özeti</CardTitle>
                  <CardDescription>Konuşma analizine dayalı</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Ana Sorun</h4>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {customer.chat_summary.main_issue}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Önemli Noktalar</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {customer.chat_summary.key_points.map(
                          (point, index) => (
                            <li key={index} className="text-sm">
                              {point}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Duygu Durumu:</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {customer.chat_summary.sentiment}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Son güncelleme:{" "}
                        {formatDate(customer.chat_summary.last_updated)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Müşteri Zaman Çizelgesi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <div className="font-medium">
                          Instagram üzerinden İlk İletişim
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(
                            customer.channels.instagram.first_message_date,
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          Müşteri diş beyazlatma hizmetleri hakkında bilgi
                          istedi
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <div className="font-medium">
                          Telefon Numarası Verildi
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(
                            customer.channels.instagram.phone_giving_date,
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          Müşteri iletişim bilgilerini paylaştı
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <div className="font-medium">
                          İlk WhatsApp İletişimi
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(
                            customer.channels.whatsapp.first_message_date,
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          Müşteri WhatsApp üzerinden randevusunu onayladı
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <div className="font-medium">Randevu Planlandı</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(customer.portfolio.appointments[0].date)}
                        </div>
                        <div className="mt-1 text-sm">
                          Diş beyazlatma için ilk danışma
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Ödeme Alındı</div>
                        <div className="text-sm text-gray-500">
                          {customer.payment_info.payment_history[0].date}
                        </div>
                        <div className="mt-1 text-sm">
                          Danışma ücreti:{" "}
                          {customer.payment_info.payment_history[0].amount.toFixed(
                            2,
                          )}{" "}
                          ₺
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming Appointments */}
            <Card className="md:col-span-1 max-h-min">
              <CardHeader>
                <CardTitle className="text-lg">Yaklaşan Randevular</CardTitle>
                <CardDescription>
                  Toplam: {customer.portfolio.appointmentCount} randevu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.portfolio.appointments
                    .filter((apt) => new Date(apt.date) >= new Date())
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-start p-3 border rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">
                                {appointment.type}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {formatDate(appointment.date)}
                              </p>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "Onaylandı"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>

                          {appointment.notes && (
                            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {appointment.notes}
                            </p>
                          )}
                          <div className="mt-3 flex space-x-2">
                            <Button variant="outline" size="sm">
                              Düzenle
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50"
                            >
                              İptal Et
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  Yeni Randevu Ekle
                </Button>
              </CardContent>
            </Card>

            {/* Treatment History */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Randevu Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6 ml-8">
                    {customer.portfolio.appointments.map((appointment) => (
                      <div key={appointment.id} className="relative">
                        <div className="absolute -left-8 mt-1.5 h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
                          <div>
                            <h4 className="font-medium">{appointment.type}</h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(appointment.date)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "Onaylandı"
                                ? "default"
                                : "outline"
                            }
                            className="mt-2 md:mt-0"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{appointment.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Treatments Tab */}
        <TabsContent value="treatments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Treatments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mevcut Tedaviler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.portfolio.treatments
                    .filter((treatment) => treatment.status !== "Tamamlandı")
                    .map((treatment, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 border rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{treatment.name}</h4>
                              <p className="text-sm text-gray-500">
                                {treatment.date}
                              </p>
                            </div>
                            <Badge variant="outline">{treatment.status}</Badge>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Button variant="outline" size="sm">
                              Detaylar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              Tamamlandı Olarak İşaretle
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {customer.portfolio.treatments.filter(
                    (treatment) => treatment.status !== "Tamamlandı",
                  ).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      Mevcut tedavi bulunmamaktadır.
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Clock className="mr-2 h-4 w-4" />
                  Yeni Tedavi Ekle
                </Button>
              </CardContent>
            </Card>

            {/* Completed Treatments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tamamlanan Tedaviler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.portfolio.treatments
                    .filter((treatment) => treatment.status === "Tamamlandı")
                    .map((treatment, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 border rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{treatment.name}</h4>
                              <p className="text-sm text-gray-500">
                                {treatment.date}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {treatment.status}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <Button variant="outline" size="sm">
                              Detaylar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {customer.portfolio.treatments.filter(
                    (treatment) => treatment.status === "Tamamlandı",
                  ).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      Tamamlanan tedavi bulunmamaktadır.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Treatment Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Tedavi Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="space-y-1">
                    {customer.portfolio.treatments.map((treatment, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="mt-1 min-h-max flex flex-col items-center">
                          <div
                            className={`h-4 w-4 rounded-full 
                            ${
                              treatment.status === "Tamamlandı"
                                ? "bg-green-200"
                                : ""
                            }
                            bg-gray-200 mb-2`}
                          />
                          <div
                            className={`flex-grow w-0.5 
                            ${
                              treatment.status === "Tamamlandı"
                                ? "bg-green-200"
                                : ""
                            }
                            bg-gray-200`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b">
                            <div>
                              <h4 className="font-medium">{treatment.name}</h4>
                              <p className="text-sm text-gray-500">
                                {treatment.date}
                              </p>
                            </div>
                            <Badge
                              variant={
                                treatment.status === "Tamamlandı"
                                  ? "default"
                                  : "outline"
                              }
                              className={`mt-2 md:mt-0 ${
                                treatment.status === "Tamamlandı"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }`}
                            >
                              {treatment.status}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm mb-4">
                            <p>Tedavi notları burada görüntülenecektir.</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left column: stack payment summary and new payments vertically */}
            <div className="flex flex-col gap-6">
              <TotalPaymentsView
                customer={customer}
                isLoading={isDebtLoading}
              />
              <NewPaymenstView />
            </div>
            {/* Right column: invoice history */}
            <div>
              <ServicePriceHistoryView customer={customer} />
            </div>
          </div>
          <InvoiceHistoryView customer={customer} />
        </TabsContent>

        {/* Chats Tab */}
        <TabsContent value="chats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Channels */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">İletişim Kanalları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.channels.instagram && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                          <Instagram className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Instagram</h4>
                          <p className="text-xs text-gray-500">
                            @{customer.channels.instagram.username}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {customer.channels.instagram.messages.length} mesaj
                      </Badge>
                    </div>
                  )}

                  {customer.channels.whatsapp && (
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">WhatsApp</h4>
                          <p className="text-xs text-gray-500">
                            {customer.phone}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {customer.channels.whatsapp.messages.length} mesaj
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat History */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Görüşme Geçmişi</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="instagram">
                    <TabsList className="mb-4">
                      {customer.channels.instagram && (
                        <TabsTrigger
                          value="instagram"
                          className="flex items-center"
                        >
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </TabsTrigger>
                      )}
                      {customer.channels.whatsapp && (
                        <TabsTrigger
                          value="whatsapp"
                          className="flex items-center"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="instagram" className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          İlk iletişim:{" "}
                          {formatDate(
                            customer.channels.instagram.first_message_date,
                          )}
                        </div>
                        <div>
                          Son mesaj:{" "}
                          {formatDate(
                            customer.channels.instagram.last_message_date,
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {customer.channels.instagram.messages.map(
                            (message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.sender === "customer"
                                      ? "bg-white border border-gray-200 text-gray-800"
                                      : "bg-blue-500 text-white"
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <p
                                    className={`text-right text-xs mt-1 ${
                                      message.sender === "customer"
                                        ? "text-gray-500"
                                        : "text-blue-100"
                                    }`}
                                  >
                                    {formatMessageTime(message.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Sohbeti Dışa Aktar
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Instagram'dan Yanıtla
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="whatsapp" className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div>
                          İlk iletişim:{" "}
                          {formatDate(
                            customer.channels.whatsapp.first_message_date,
                          )}
                        </div>
                        <div>
                          Son mesaj:{" "}
                          {formatDate(
                            customer.channels.whatsapp.last_message_date,
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {customer.channels.whatsapp.messages.map(
                            (message) => (
                              <div
                                key={message.id}
                                className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.sender === "customer"
                                      ? "bg-white border border-gray-200 text-gray-800"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <p
                                    className={`text-right text-xs mt-1 ${
                                      message.sender === "customer"
                                        ? "text-gray-500"
                                        : "text-green-100"
                                    }`}
                                  >
                                    {formatMessageTime(message.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Sohbeti Dışa Aktar
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp'tan Yanıtla
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

CustomerDetail.getLayout = (children) => <MainLayout>{children}</MainLayout>;
