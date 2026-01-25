"use client"
import React, { useState } from 'react';
import { Heart, ChefHat, Star, Clock, MapPin, ShoppingCart, Trash2, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Single restaurant data
const restaurantInfo = {
  name: "Himel's Biryani House",
  cuisine: "Authentic Bangladeshi",
  rating: 4.8,
  deliveryTime: "25-35 min",
  distance: "1.2 km",
  minOrder: 200,
  deliveryFee: 30,
  address: "Gulshan-1, Dhaka",
  tags: ['Biryani', 'Kabab', 'Halal', 'Traditional'],
  isOpen: true
};

// All dishes are from the same restaurant
const favoriteDishes = [
  {
    id: 1,
    name: 'Kacchi Biryani',
    price: 450,
    rating: 4.9,
    image: '🍚',
    category: 'Biriyani',
    prepTime: '30-40 mins',
    tags: ['Spicy', 'Chef Special', 'Most Popular'],
    description: 'Authentic Dhaka-style kacchi biryani with marinated mutton'
  },
  {
    id: 2,
    name: 'Beef Rezala',
    price: 320,
    rating: 4.7,
    image: '🥘',
    category: 'Meat Dishes',
    prepTime: '25-35 mins',
    tags: ['Premium', 'Traditional'],
    description: 'Tender beef cooked in rich yogurt and spice gravy'
  },
  {
    id: 3,
    name: 'Morog Polao',
    price: 380,
    rating: 4.6,
    image: '🍗',
    category: 'Biriyani',
    prepTime: '20-30 mins',
    tags: ['Chicken', 'Aromatic'],
    description: 'Fragrant rice with succulent chicken pieces'
  },
  {
    id: 4,
    name: 'Ilish Bhapa',
    price: 550,
    rating: 4.8,
    image: '🐟',
    category: 'Fish',
    prepTime: '20-30 mins',
    tags: ['Seasonal', 'Special', 'Hilsa'],
    description: 'Steamed hilsa fish with mustard paste'
  },
  {
    id: 5,
    name: 'Rosogolla',
    price: 80,
    rating: 4.5,
    image: '🍡',
    category: 'Desserts',
    prepTime: 'Ready',
    tags: ['Sweet', 'Traditional'],
    description: 'Fresh cottage cheese balls in light sugar syrup'
  },
  {
    id: 6,
    name: 'Mango Lassi',
    price: 120,
    rating: 4.7,
    image: '🥭',
    category: 'Beverages',
    prepTime: '5 mins',
    tags: ['Refreshing', 'Seasonal'],
    description: 'Fresh mango yogurt drink'
  },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('dishes'); // Only dishes tab since it's single restaurant
  const [searchQuery, setSearchQuery] = useState('');
  const [removedItems, setRemovedItems] = useState<number[]>([]);

  const handleRemove = (id: number) => {
    setRemovedItems([...removedItems, id]);
    setTimeout(() => {
      setRemovedItems(prev => prev.filter(itemId => itemId !== id));
    }, 5000);
  };

  const handleUndo = () => {
    setRemovedItems([]);
  };

  const filteredDishes = favoriteDishes.filter(dish =>
    !removedItems.includes(dish.id) &&
    (dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dish.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dish.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const categories = Array.from(new Set(favoriteDishes.map(dish => dish.category)));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Favorite Dishes</h1>
            <p className="text-muted-foreground">
              Your saved favorites from {restaurantInfo.name}
            </p>
          </div>
        </div>

        {/* Restaurant Info Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{restaurantInfo.name}</h2>
                  <p className="text-muted-foreground">{restaurantInfo.cuisine}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurantInfo.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{restaurantInfo.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>{restaurantInfo.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to Menu
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredDishes.length === 0 && searchQuery === '' && removedItems.length === 0 && (
          <Alert className="mb-6">
            <Heart className="h-4 w-4" />
            <AlertDescription>
              You haven't added any dishes to favorites yet. Browse our menu and tap the heart icon!
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your favorite dishes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {removedItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleUndo}
              className="whitespace-nowrap"
            >
              Undo Remove ({removedItems.length})
            </Button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={searchQuery === '' ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchQuery('')}
          >
            All ({favoriteDishes.length})
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={searchQuery.toLowerCase() === category.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchQuery(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery || removedItems.length > 0 
              ? 'No dishes found' 
              : 'No favorite dishes yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? 'Try a different search term' 
              : 'Start adding dishes to your favorites from our menu'}
          </p>
          <Link href="/">
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Browse Full Menu
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Favorite Dishes'}
              <span className="text-muted-foreground ml-2">({filteredDishes.length})</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Tap the heart icon on any dish to add to favorites
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <Card key={dish.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <div className="text-3xl">{dish.image}</div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg truncate">{dish.name}</h3>
                          <p className="text-sm text-muted-foreground">{dish.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(dish.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{dish.rating}</span>
                          <span className="text-muted-foreground">•</span>
                          <Badge variant="secondary" className="text-xs">
                            {dish.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">৳{dish.price}</span>
                          <p className="text-xs text-muted-foreground">per serving</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dish.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {dish.prepTime}
                        </div>
                          <Button size="sm" className="gap-1">
                            <ShoppingCart className="h-3 w-3" />
                            Add to Cart
                          </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}