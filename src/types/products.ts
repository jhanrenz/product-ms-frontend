export interface Category {
    id: number,
    name: string
}

export interface ProductForm {
    id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: File | string | null; // File for new upload, string for existing, null for none
  image_url: string | null;
  category? : Category;
}

