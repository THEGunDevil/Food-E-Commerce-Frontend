// app/offers/page.tsx
"use client";

import React, { useState } from "react";
import {
  Percent,
  Tag,
  Clock,
  CheckCircle,
  Copy,
  Gift,
  Star,
  Calendar,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const offers = [
  {
    id: 1,
    title: "First Order Free Delivery",
    code: "WELCOME50",
    description: "Get free delivery on your first order",
    discount: "Free Delivery",
    type: "delivery",
    validUntil: "2024-02-28",
    minOrder: 0,
    terms: ["New users only", "One-time use"],
    status: "active",
    icon: "🎉",
  },
  {
    id: 2,
    title: "Weekend Special",
    code: "WEEKEND25",
    description: "25% off on all orders above ৳500",
    discount: "25% OFF",
    type: "discount",
    validUntil: "2024-02-25",
    minOrder: 500,
    terms: ["Weekends only", "Max discount ৳200"],
    status: "active",
    icon: "🎁",
  },
  {
    id: 3,
    title: "Biryani Bonanza",
    code: "BIRYANI100",
    description: "Flat ৳100 off on all biryani orders",
    discount: "৳100 OFF",
    type: "category",
    validUntil: "2024-03-15",
    minOrder: 400,
    terms: ["Only on biryani items", "All restaurants"],
    status: "active",
    icon: "🍚",
  },
  {
    id: 4,
    title: "Premium Member Offer",
    code: "PREMIUM30",
    description: "30% off for premium members",
    discount: "30% OFF",
    type: "membership",
    validUntil: "2024-04-01",
    minOrder: 300,
    terms: ["Premium members only", "Unlimited uses"],
    status: "active",
    icon: "⭐",
  },
  {
    id: 5,
    title: "Quick Delivery Offer",
    code: "FAST50",
    description: "৳50 off on orders delivered within 30 mins",
    discount: "৳50 OFF",
    type: "delivery",
    validUntil: "2024-02-20",
    minOrder: 350,
    terms: ["30-min delivery only", "Participating restaurants"],
    status: "expired",
    icon: "⚡",
  },
];

const ongoingPromotions = [
  {
    id: 1,
    title: "Refer & Earn",
    description: "Refer friends and get ৳200 cashback each",
    reward: "৳200 Cashback",
    icon: <Gift className="h-8 w-8 text-purple-600" />,
    progress: 3,
    target: 5,
    action: "Invite Friends",
  },
  {
    id: 2,
    title: "Order Streak",
    description: "Order 5 days in a row to unlock special rewards",
    reward: "Free Dessert",
    icon: <Star className="h-8 w-8 text-amber-600" />,
    progress: 2,
    target: 5,
    action: "Continue Streak",
  },
  {
    id: 3,
    title: "Review & Get Rewards",
    description: "Review 3 restaurants to get ৳100 off",
    reward: "৳100 OFF",
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    progress: 1,
    target: 3,
    action: "Write Reviews",
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getOfferBadge = (type: string) => {
    switch (type) {
      case "delivery":
        return <Badge variant="secondary">Delivery</Badge>;
      case "discount":
        return <Badge className="bg-green-100 text-green-800">Discount</Badge>;
      case "category":
        return <Badge className="bg-blue-100 text-blue-800">Category</Badge>;
      case "membership":
        return (
          <Badge className="bg-purple-100 text-purple-800">Membership</Badge>
        );
      default:
        return <Badge variant="outline">Offer</Badge>;
    }
  };

  const filteredOffers = offers.filter((offer) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return offer.status === "active";
    if (activeTab === "expired") return offer.status === "expired";
    return true;
  });

  const activeOffers = offers.filter((offer) => offer.status === "active");

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Percent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Offers & Promotions
            </h1>
            <p className="text-muted-foreground">
              Save more with exclusive deals and coupons
            </p>
          </div>
        </div>

        {/* Active Offers Count */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Offers</p>
                <p className="text-2xl font-bold">{activeOffers.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">
                  {
                    offers.filter(
                      (o) =>
                        new Date(o.validUntil) <
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Promotions</p>
                <p className="text-2xl font-bold">{ongoingPromotions.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ongoing Promotions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ongoing Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ongoingPromotions.map((promo) => (
            <Card key={promo.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  {promo.icon}
                  <div>
                    <h3 className="font-semibold text-lg">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {promo.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {promo.progress}/{promo.target}
                      </span>
                    </div>
                    <Progress value={(promo.progress / promo.target) * 100} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reward</p>
                      <p className="font-bold text-lg">{promo.reward}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {promo.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coupons */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Available Coupons</h2>

          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <Percent className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No offers available</h3>
            <p className="text-muted-foreground mb-6">
              Check back later for new offers and promotions
            </p>
            <Button variant="outline">View All Restaurants</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                className={`hover:shadow-lg transition-shadow ${
                  offer.status === "expired" ? "opacity-75" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{offer.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        {getOfferBadge(offer.type)}
                      </div>
                    </div>
                    {offer.status === "expired" && (
                      <Badge variant="destructive" className="text-xs">
                        Expired
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{offer.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Discount Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className="text-lg px-3 py-1 bg-linear-to-r from-green-500 to-emerald-500">
                      {offer.discount}
                    </Badge>
                    {offer.minOrder > 0 && (
                      <span className="text-sm text-muted-foreground">
                        Min order: ৳{offer.minOrder}
                      </span>
                    )}
                  </div>

                  {/* Code Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Coupon Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-muted px-3 py-2 rounded-md font-mono text-lg font-bold">
                        {offer.code}
                      </code>
                      <Button
                        size="sm"
                        variant={
                          copiedCode === offer.code ? "default" : "outline"
                        }
                        onClick={() => handleCopyCode(offer.code)}
                        className="h-10 px-3"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Valid until:{" "}
                        {new Date(offer.validUntil).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <Separator />

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Terms & Conditions:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {offer.terms.map((term, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                            {term}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={offer.status === "expired"}
                    onClick={() => (window.location.href = "/restaurants")}
                  >
                    Apply Offer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Special Alert */}
      <Alert className="mt-8 bg-linear-to-r from-orange-50 to-red-50 border-orange-200">
        <Gift className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Birthday Month Special!</p>
              <p>
                Get an extra 20% off on your birthday month. Add your birth date
                in profile settings.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700"
            >
              Update Profile
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
