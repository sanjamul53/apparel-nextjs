import { Schema, model, models, Document, Model } from 'mongoose';

export interface ty_Products extends Document {
  name: string;
  price: {
    min: number;
    max: number;
  };
  offer: number;
  sort_order: number;
  image_primary: string;
  image_variation: string;
  brand: string;
  styleName: string;
  colorFamily_size_list: {
    type: 'color'| 'size',
    name: string;
  }[];
  baseCategory: string;
  sub_list: number[];
  total_sold: number;
  rating_sum: number;
  rating_quantity: number;
  description: string;
  variation_list: {
    color: string;
    color_hex: string;
    size: string;
    price: number;
    front_image?: string;
    back_image?: string;
    side_image?: string;
  }[];
  offer_title?: string;
  sale_end_date?: number;
};

const productSchema = new Schema<ty_Products>({

  name: {
    type: String,
    required: true
  },

  price: {
    min: {
      type: Number,
      required: true,
      min: 0
    },
    max: {
      type: Number,
      required: true,
      min: 0
    }
  },

  offer: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  sort_order: {
    type: Number,
    default: 1
  },

  image_primary: {
    type: String,
    required: true
  },

  image_variation: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  styleName: {
    type: String,
    required: true
  },

  colorFamily_size_list: [{
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  }],

  baseCategory: {
    type: String,
    required: true
  },

  sub_list: [{
    type: Number,
    required: true
  }],

  total_sold: {
    type: Number,
    default: 0,
    min: 0
  },

  rating_sum: {
    type: Number,
    default: 0,
    min: 0
  },

  rating_quantity: {
    type: Number,
    default: 0,
    min: 0
  },

  variation_list: [{

    color: {
      type: String,
      required: true
    },
    color_hex: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    front_image: {
      type: String,
    },
    back_image: {
      type: String,
    },
    side_image: {
      type: String,
    }

  }],

  offer_title: {
    type: String
  },
  
  sale_end_date: {
    type: Number
  }

});

export const Products: Model<ty_Products> = models.Product || 
model<ty_Products>('Product', productSchema);


productSchema.index({
  baseCategory: 1,
  sub_list: 1
});

productSchema.index({
  baseCategory: 1,
  sizes: 1
});

// index for sorting purpose
productSchema.index({
  'price.min': 1
});

productSchema.index({
  sort_order: 1
});