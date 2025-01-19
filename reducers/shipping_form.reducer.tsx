export type T_Reducer_Shipping_State = {

  receiver_name: string;
  phone_number: string;
  email: string;
  picking_address: string;
  area: string;
  post_code: string;
  city: string;
  state_name: string;
  delivary_time: string;

}

export type T_Reducer_Shipping_Dispatch =
  { type: 'receiver_name', payload: string } |
  { type: 'phone_number', payload: string } |
  { type: 'email', payload: string } |
  { type: 'picking_address', payload: string } |
  { type: 'area', payload: string } |
  { type: 'city', payload: string } |
  { type: 'post_code', payload: number } |
  { type: 'state_name', payload: string } |
  { type: 'delivary_time', payload: string } ;


export const shippingFormReducer_initial: T_Reducer_Shipping_State = {

  receiver_name: '',
  phone_number: '',
  email: '',
  picking_address: '',
  area: '',
  city: '',
  post_code: '',
  state_name: '',
  delivary_time: ''

};

export const shippingFormReducer = (
  state:T_Reducer_Shipping_State, action: T_Reducer_Shipping_Dispatch
): T_Reducer_Shipping_State => {

  switch(action.type) {

    // ==================== receiver name =========================
    case 'receiver_name': {

      return {
        ...state,
        receiver_name: action.payload
      }

    }

    // ==================== phone number =========================
    case 'phone_number': {
      return {
        ...state,
        phone_number: action.payload
      }
    }

    // ==================== email =========================
    case 'email': {
      return {
        ...state,
        email: action.payload
      }
    }

    // ==================== house_number =========================
    case 'picking_address': {
      return {
        ...state,
        picking_address: action.payload
      }
    }

    // ==================== area =========================
    case 'area': {
      return {
        ...state,
        area: action.payload
      }
    }


    // ==================== city =========================
    case 'city': {
      return {
        ...state,
        city: action.payload
      }
    }


    // ==================== post_code =========================
    case 'post_code': {
      return {
        ...state,
        post_code: `${action.payload}`
      }
    }


    // ==================== state name =========================
    case 'state_name': {
      return {
        ...state,
        state_name: action.payload
      }
    }


    // ==================== delivary_time =========================
    case 'delivary_time': {
      return {
        ...state,
        delivary_time: action.payload
      }
    }
  

    default:
      return state;

  }


}