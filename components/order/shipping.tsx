import { FC, Dispatch } from 'react';
import { Section } from '../shared/section';
import classes from '@/styles/order/shipping.module.css';
import { TextField } from '../shared/text_field';
import { T_Reducer_Shipping_Dispatch, T_Reducer_Shipping_State } 
from '@/reducers/shipping_form.reducer';
import { Section_Title } from './shared';

interface IComp {
  state: T_Reducer_Shipping_State,
  dispatch: Dispatch<T_Reducer_Shipping_Dispatch>
}

export const Shipping_Form: FC<IComp> = ({ state, dispatch }) => {



  return (
    <Section>

      <Section_Title title="Shipping Address" />

      <div className={classes.root}>

        <div className={classes.half}>
          <TextField value={state.receiver_name} label="Receiver Name" 
            changeHandler={e=> dispatch({ type: 'receiver_name', payload: e })} 
          />
        </div>

        <div className={classes.half}>
          <TextField value={state.phone_number} label="Receiver Phone Number" 
            changeHandler={e=> dispatch({ type: 'phone_number', payload: e })} 
          />
        </div>


        <div className={classes.half}>
          <TextField value={state.email} label="Receiver Email" 
            changeHandler={e=> dispatch({ type: 'email', payload: e })} 
          />
        </div>

        <div className={classes.half}>
          <TextField value={state.area} label="Street Name/ Area/ Village" 
            changeHandler={e=> dispatch({ type: 'area', payload: e })} 
          />
        </div>

        <div className={classes.half}>
          <TextField value={state.post_code} label="Post Code"  type="number"
            changeHandler={e=> dispatch({ type: 'post_code', payload: Number(e) })} 
          />
        </div>

        <div className={classes.half}>
          <TextField value={state.city} label="City Name"
            changeHandler={e=> dispatch({ type: 'city', payload: e })} 
          />
        </div>

        <div className={classes.half}>
          <TextField value={state.state_name} label="State Name"
            changeHandler={e=> dispatch({ type: 'state_name', payload: e })} 
          />
        </div>

        <div className={classes.full}>
          <TextField value={state.picking_address} label="Picking address" 
            changeHandler={e=> dispatch({ type: 'picking_address', payload: e })} 
            multiline={true}
          />
        </div>

      </div>

    </Section>
  )

};


// https://dribbble.com/shots/23134588-Shipping-Address-Form-Daily-UI-Design-42