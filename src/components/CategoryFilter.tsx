import { Button } from './ui/button';

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="border-b bg-white sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              className="flex-shrink-0 gap-2"
              onClick={() => onSelectCategory(category.name)}
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
