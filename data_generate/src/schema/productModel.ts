import { Schema, model } from 'mongoose';

const productSchema  = new Schema({

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

export const productModel = model('product', productSchema);

// productSchema.index({
//   brand: 1,
//   styleName: 1
// },
// {
//   unique: true
// });


/*

 - object schema: https://stackoverflow.com/questions/42019679/object-type-in-mongoose

*/