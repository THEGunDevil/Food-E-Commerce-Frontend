// components/menu/EditMenuForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface EditMenuFormProps {
  menuItem: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    prepTime: string;
    isAvailable: boolean;
    ingredients: string[];
    tags: string[];
    imageUrl?: string;
    spicyLevel?: number;
    isVegetarian?: boolean;
    isSpecial?: boolean;
    discountPrice?: number;
  };
  onSuccess: () => void;
  onDelete?: (id: string) => void;
}

export default function EditMenuForm({ menuItem, onSuccess, onDelete }: EditMenuFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    prepTime: '',
    isAvailable: true,
    ingredients: '',
    tags: '',
    spicyLevel: '1',
    isVegetarian: false,
    isSpecial: false,
    discountPrice: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Initialize form with menu item data
  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name,
        description: menuItem.description || '',
        price: menuItem.price.toString(),
        category: menuItem.category,
        prepTime: menuItem.prepTime || '',
        isAvailable: menuItem.isAvailable,
        ingredients: menuItem.ingredients?.join(', ') || '',
        tags: menuItem.tags?.join(', ') || '',
        spicyLevel: menuItem.spicyLevel?.toString() || '1',
        isVegetarian: menuItem.isVegetarian || false,
        isSpecial: menuItem.isSpecial || false,
        discountPrice: menuItem.discountPrice?.toString() || '',
        imageUrl: menuItem.imageUrl || '',
      });
      setImagePreview(menuItem.imageUrl || null);
    }
  }, [menuItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Process form data
      const processedData = {
        ...formData,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        spicyLevel: parseInt(formData.spicyLevel),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
      };

      // In real app, make API call here
      console.log('Updating menu item:', processedData);
      

      
      onSuccess();
    } catch (error) {

    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {

      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {

      return;
    }

    setIsUploading(true);
    
    try {
      // In real app, upload to cloud storage here
      // For demo, create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        handleChange('imageUrl', reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      
      
    } catch (error) {

      setIsUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    handleChange('imageUrl', '');
  };

  const spicyLevels = [
    { value: '0', label: 'No Spice' },
    { value: '1', label: 'Mild' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'Spicy' },
    { value: '4', label: 'Very Spicy' },
    { value: '5', label: 'Extra Spicy' },
  ];

  const categories = [
    { value: 'biriyani', label: 'Biriyani' },
    { value: 'meat', label: 'Meat Dishes' },
    { value: 'fish', label: 'Fish' },
    { value: 'vegetable', label: 'Vegetable' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'special', label: 'Special Items' },
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Edit Menu Item</CardTitle>
            <CardDescription>Update dish details and settings</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={formData.isAvailable ? "default" : "secondary"}>
              {formData.isAvailable ? "Available" : "Unavailable"}
            </Badge>
            {formData.isSpecial && <Badge variant="outline" className="border-orange-500 text-orange-600">Special</Badge>}
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-auto">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="basic" className="space-y-6">
            <CardContent className="space-y-6 pt-6">
              {/* Image Preview on Mobile */}
              <div className="block lg:hidden">
                {imagePreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={imagePreview}
                      alt="Dish preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center mb-4">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">No image uploaded</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Dish Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Kacchi Biryani"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the dish, its taste, and special features..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Right Column - Price & Timing */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Regular Price (৳) *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 450"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discountPrice">Discount Price (৳)</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 399"
                        value={formData.discountPrice}
                        onChange={(e) => handleChange('discountPrice', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prepTime">Preparation Time</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="prepTime"
                        placeholder="e.g., 30-40"
                        value={formData.prepTime}
                        onChange={(e) => handleChange('prepTime', e.target.value)}
                      />
                      <span className="text-sm text-gray-500 whitespace-nowrap">minutes</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Spicy Level</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {spicyLevels.map((level) => (
                        <Button
                          key={level.value}
                          type="button"
                          variant={formData.spicyLevel === level.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleChange('spicyLevel', level.value)}
                          className="text-xs"
                        >
                          {level.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isVegetarian" className="cursor-pointer">
                        Vegetarian Dish
                      </Label>
                      <Switch
                        id="isVegetarian"
                        checked={formData.isVegetarian}
                        onCheckedChange={(checked) => handleChange('isVegetarian', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="isSpecial" className="cursor-pointer">
                        Special Item
                      </Label>
                      <Switch
                        id="isSpecial"
                        checked={formData.isSpecial}
                        onCheckedChange={(checked) => handleChange('isSpecial', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="isAvailable" className="cursor-pointer">
                        Available for Ordering
                      </Label>
                      <Switch
                        id="isAvailable"
                        checked={formData.isAvailable}
                        onCheckedChange={(checked) => handleChange('isAvailable', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      id="ingredients"
                      placeholder="Enter ingredients separated by commas
e.g., Rice, Mutton, Potatoes, Spices, Yogurt"
                      value={formData.ingredients}
                      onChange={(e) => handleChange('ingredients', e.target.value)}
                      rows={5}
                      className="resize-none font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">Separate ingredients with commas</p>
                  </div>

                  {formData.ingredients && (
                    <div className="space-y-2">
                      <Label>Preview:</Label>
                      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
                        {formData.ingredients.split(',').map((ingredient, index) => (
                          ingredient.trim() && (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {ingredient.trim()}
                            </Badge>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., Spicy, Popular, Chef Special, Winter Special"
                      value={formData.tags}
                      onChange={(e) => handleChange('tags', e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Add tags for better discoverability</p>
                  </div>

                  {formData.tags && (
                    <div className="space-y-2">
                      <Label>Preview:</Label>
                      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
                        {formData.tags.split(',').map((tag, index) => (
                          tag.trim() && (
                            <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                              {tag.trim()}
                            </Badge>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-4">
                    <Label>Dish Status</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg border ${formData.isAvailable ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${formData.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-sm font-medium">Available</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Ready for ordering</p>
                      </div>
                      <div className={`p-3 rounded-lg border ${formData.isSpecial ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${formData.isSpecial ? 'bg-orange-500' : 'bg-gray-300'}`} />
                          <span className="text-sm font-medium">Special Dish</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Featured item</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Dish Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={isUploading}
                          className="gap-2"
                        >
                          {isUploading ? 'Uploading...' : 'Choose Image'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL (Alternative)</Label>
                    <Input
                      placeholder="Paste image URL here..."
                      value={formData.imageUrl}
                      onChange={(e) => {
                        handleChange('imageUrl', e.target.value);
                        setImagePreview(e.target.value);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image Guidelines</Label>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                      <li>Use high-quality images (at least 800x600px)</li>
                      <li>Show the dish clearly</li>
                      <li>Good lighting is important</li>
                      <li>Use consistent background</li>
                    </ul>
                  </div>
                </div>

                {/* Image Preview Section */}
                <div className="space-y-4">
                  <Label>Image Preview</Label>
                  <div className="border rounded-lg overflow-hidden bg-gray-50 aspect-square flex items-center justify-center">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Dish preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteImage}
                          className="absolute top-2 right-2 gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">No image selected</p>
                        <p className="text-xs text-gray-400">Preview will appear here</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    This is how customers will see the dish image
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h4 className="font-semibold text-yellow-800">Advanced Settings</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    These settings are optional. Only modify if you understand their impact.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Inventory Settings</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="lowStockAlert" className="text-sm cursor-pointer">
                            Low Stock Alert
                          </Label>
                          <Switch id="lowStockAlert" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="batchCooking" className="text-sm cursor-pointer">
                            Batch Cooking
                          </Label>
                          <Switch id="batchCooking" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="seasonalAvailability">Seasonal Availability</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Available All Year</SelectItem>
                          <SelectItem value="summer">Summer Special</SelectItem>
                          <SelectItem value="winter">Winter Special</SelectItem>
                          <SelectItem value="ramadan">Ramadan Special</SelectItem>
                          <SelectItem value="eid">Eid Special</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Delete Menu Item</Label>
                      <div className="rounded-lg border border-red-200 p-4">
                        <p className="text-sm text-red-600 mb-3">
                          Warning: This action cannot be undone. This will permanently delete the menu item.
                        </p>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete?.(menuItem.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Menu Item
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="lastUpdated">Last Updated</Label>
                      <Input
                        id="lastUpdated"
                        value={new Date().toLocaleDateString('en-BD', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between border-t pt-6">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onSuccess}
              className="gap-2 w-full sm:w-auto"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete?.(menuItem.id)}
              className="gap-2 w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              Delete Item
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab(activeTab === 'basic' ? 'advanced' : 'basic')}
              className="gap-2 w-full sm:w-auto"
            >
              {activeTab === 'basic' ? 'Advanced Settings' : 'Basic Info'}
            </Button>
            
            <Button
              type="submit"
              className="gap-2 w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}