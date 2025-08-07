export interface IProduct {
  code: string;
  product_name: string;
  generic_name?: string; 
  brands?: string;
  image_front_thumb_url: string;
  isLiked?: boolean;
}


export interface IProductsState {
    items: IProduct[];
    loading: boolean;
    error: string | null;
  }
  