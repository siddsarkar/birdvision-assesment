export class Product {
  readonly id: number;
  readonly title: string;
  readonly images?: string[];
  readonly description?: string;
  readonly price?: number;
  readonly discountPercentage?: number;
  readonly category?: string;
  readonly rating?: number;
  readonly brand?: string;

  constructor({
    id,
    title,
    images,
    description,
    price,
    discountPercentage,
    category,
    rating,
    brand,
  }: {
    id?: number;
    title?: string;
    images?: string[];
    description?: string;
    price?: number;
    discountPercentage?: number;
    category?: string;
    rating?: number;
    brand?: string;
  }) {
    if (!id) {
      throw new Error("Product id is required");
    }

    if (!title) {
      throw new Error("Product title is required");
    }

    this.id = id;
    this.title = title;
    this.images = images;
    this.description = description;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.category = category;
    this.rating = rating;
    this.brand = brand;
  }
}
