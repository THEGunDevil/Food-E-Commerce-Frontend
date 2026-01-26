import { Category } from "@/models/models";
import { Card, CardContent } from "./ui/card";
// import Image from "next/image";
export const CategoryCard = ({
  category,
  categoryCount,
}: {
  category: Category;
  categoryCount: number;
}) => {

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="md:p-6 p-4">
        <div
          className={`bg-none rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <img
            src={category.cat_image_url}
            className="w-40 h-40 rounded-md object-cover"
            alt={category.name}
          />
          {/* <Image priority width={100} fill
  className="object-cover rounded-lg"
  onError={(e) => {
    e.currentTarget.src = placeholder.src;
  }}
  priority
   height={100} src={category.cat_image_url} alt={category.name} /> */}
        </div>
        <h3 className="font-semibold text-center mb-1 whitespace-nowrap">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          {categoryCount} items
        </p>
      </CardContent>
    </Card>
  );
};
