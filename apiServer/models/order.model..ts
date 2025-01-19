import { Schema, model, models, Document, Model } from 'mongoose';
import { ty_order_status } from '../types/order.type';


export interface ty_order_product_variation_item {
  _id: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  color: string;
  size: string;
}

export interface ty_order_product_item {

  _id: Schema.Types.ObjectId;

  variation_list: ty_order_product_variation_item[]

}

interface ty_OrderSchema extends Document {
  user_id: Schema.Types.ObjectId;
  total_quantity: number;
  total_price: number;
  paid_amount: number;
  status: ty_order_status;
  order_at: Date;
  // paid_at: Date | null;
  deliver_address: string;
  products: ty_order_product_item[],
  payment_record: {
    method: 'paypal'| 'stripe',
    transaction_id: string;
    order_id: string;
    paid_at: Date;
  }
};

const orderSchema = new Schema<ty_OrderSchema>({

  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  
  total_quantity: {
    type: Number,
    required: true,
    min: 1
  },
  total_price: {
    type: Number,
    required: true,
    min: 1
  },
  paid_amount: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: [
      'pending', 'paid', 'delivered'
    ],
    required: true,
    default: 'pending'
  },
  order_at: {
    type: Date,
    required: true
  },
  // paid_at: {
  //   type: Date,
  //   default: null
  // },
  deliver_address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300
  },

  products: [

    {
      productId: Schema.Types.ObjectId,

      variation_list: [
        {
          _id: Schema.Types.ObjectId,
          quantity: Number,
          totalPrice: Number,
          color: String,
          size: String
        }
      ]
    }

  ],

  payment_record: {

    type: {
      method: String,
      transaction_id: String,
      order_id: String,
      paid_at: Date
    },

    required: false

    // method: {
    //   type: String,
    //   required: true
    // },
    // transaction_id: {
    //   type: String,
    //   required: true
    // },
    // order_id: String
  }

});

export const Orders: Model<ty_OrderSchema> = models.Order ||
  model<ty_OrderSchema>('Order', orderSchema);

orderSchema.index({ user_id: 1 });