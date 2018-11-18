// the interface that declares a Product entity, can be thought of a datatype
export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
}
