import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">F</span>
              </div>
              <span className="text-xl font-bold text-secondary-foreground">FreshFoods</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Delivering fresh, quality food directly to your doorstep since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Shop All', 'Seasonal Produce', 'Recipe Collections', 'Delivery Information', 'Return Policy'].map((link) => (
                <li key={link}>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Fresh Fruits', 'Organic Vegetables', 'Dairy & Eggs', 'Meat & Poultry', 'Bakery Items'].map((category) => (
                <li key={category}>
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-foreground mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Food Street, City</li>
              <li>contact@freshfoods.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon-Sun: 8AM-10PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 FreshFoods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};