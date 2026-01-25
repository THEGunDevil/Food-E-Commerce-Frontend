// app/profile/page.tsx
"use client";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Shield,
  Package,
  Award,
  ChevronRight,
  Check,
  X,
  Save,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const userProfile = {
  name: "Himel Ahmed",
  email: "himel.ahmed@example.com",
  phone: "+880 1712 345678",
  joinDate: "Joined January 2023",
  avatar: "/avatar.jpg",
  address: "House 123, Road 456, Gulshan-1, Dhaka",
  deliveryInstructions: "Call before delivery, leave at door",
  loyaltyPoints: 1250,
  membershipLevel: "Gold",
  nextLevelPoints: 750,
  totalOrders: 42,
  totalSpent: "৳24,500",
  favoriteCuisine: "Bangladeshi",
  dietaryPreferences: ["Halal", "Medium Spicy"],
};

const orderHistory = [
  {
    id: 1,
    date: "2024-02-15",
    items: "Kacchi Biryani x2",
    total: "৳900",
    status: "Delivered",
  },
  {
    id: 2,
    date: "2024-02-10",
    items: "Beef Rezala, Rosogolla",
    total: "৳400",
    status: "Delivered",
  },
  {
    id: 3,
    date: "2024-02-05",
    items: "Morog Polao, Lassi",
    total: "৳500",
    status: "Delivered",
  },
  {
    id: 4,
    date: "2024-02-01",
    items: "Ilish Bhapa, Rice",
    total: "৳650",
    status: "Cancelled",
  },
];

const savedAddresses = [
  {
    id: 1,
    name: "Home",
    address: "House 123, Road 456, Gulshan-1",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    address: "Level 5, Banani Tower, Banani",
    isDefault: false,
  },
  {
    id: 3,
    name: "Parents House",
    address: "Dhanmondi 27, Dhaka",
    isDefault: false,
  },
];

const notificationPreferences = [
  {
    id: 1,
    label: "Order Updates",
    description: "Get notified about your order status",
    enabled: true,
  },
  {
    id: 2,
    label: "Promotions & Offers",
    description: "Receive special offers and discounts",
    enabled: true,
  },
  {
    id: 3,
    label: "New Menu Items",
    description: "Be the first to know about new dishes",
    enabled: false,
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [notifications, setNotifications] = useState(notificationPreferences);
  const [activeTab, setActiveTab] = useState("overview");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In real app, you would make an API call here
    console.log("Saving profile:", formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleNotificationToggle = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };
  const handleEditClick = () => {
    if (!isEditing) {
      // Always switch to Overview tab when clicking Edit
      setActiveTab("overview");
    }
    setIsEditing(!isEditing);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-3xl bg-linear-to-r from-blue-500 to-purple-500">
                      HA
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 h-10 w-10 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Mail className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>

                <Badge className="gap-1 mb-4">
                  <Award className="h-3 w-3" />
                  {formData.membershipLevel} Member
                </Badge>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Loyalty Points</span>
                  <span className="font-bold">{formData.loyaltyPoints}</span>
                </div>
                <Progress
                  value={
                    (formData.loyaltyPoints /
                      (formData.loyaltyPoints + formData.nextLevelPoints)) *
                    100
                  }
                />
                <div className="text-sm text-center text-muted-foreground">
                  {formData.nextLevelPoints} points to next level
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{formData.totalOrders}</p>
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                  </div>
                  {/* <div className="text-center">
                    <p className="text-2xl font-bold">{formData.totalSpent}</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div> */}
                </div>
              </div>

              {/* Edit Button */}
              <Button
                className="w-full gap-2"
                onClick={handleEditClick}
                variant={isEditing ? "outline" : "default"}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel Edit
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              {isEditing && activeTab === "overview" && (
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Member Since</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="joinDate"
                          value={formData.joinDate}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10 min-h-20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Delivery Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={formData.deliveryInstructions}
                      onChange={(e) =>
                        handleInputChange(
                          "deliveryInstructions",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      placeholder="Any special instructions for delivery..."
                      className="min-h-[60px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dietary Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>
                    Your food preferences and restrictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.dietaryPreferences.map((pref, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        <Check className="h-3 w-3" />
                        {pref}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Add Preference
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              {/* Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>
                    Manage your delivery addresses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{address.name}</h3>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.address}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={
                          selectedAddress === address.id ? "text-primary" : ""
                        }
                      >
                        {selectedAddress === address.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    + Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{notif.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {notif.description}
                        </p>
                      </div>
                      <Switch
                        checked={notif.enabled}
                        onCheckedChange={() =>
                          handleNotificationToggle(notif.id)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                      </div>
                    </div>
                    <Badge variant="outline">Default</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive order</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card> */}
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Your recent orders from our restaurant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">{order.items}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total}</p>
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : "destructive"
                              }
                              className="mt-1"
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>

              {/* Favorite Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Ordered</CardTitle>
                  <CardDescription>Your most ordered dishes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Kacchi Biryani",
                        count: 12,
                        lastOrdered: "2 days ago",
                      },
                      {
                        name: "Beef Rezala",
                        count: 8,
                        lastOrdered: "1 week ago",
                      },
                      {
                        name: "Morog Polao",
                        count: 6,
                        lastOrdered: "3 days ago",
                      },
                      {
                        name: "Mango Lassi",
                        count: 15,
                        lastOrdered: "Yesterday",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-xl">
                            {item.name.includes("Biryani")
                              ? "🍚"
                              : item.name.includes("Rezala")
                              ? "🥘"
                              : item.name.includes("Polao")
                              ? "🍗"
                              : "🥭"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.count} orders</span>
                            <span>•</span>
                            <span>{item.lastOrdered}</span>
                          </div>
                        </div>
                        <Button size="sm">Order Again</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Alert */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your account security is important. For any changes to sensitive
              information, we may ask for verification.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
