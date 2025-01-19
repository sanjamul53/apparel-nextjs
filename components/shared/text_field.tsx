import { useState, useRef, FC, HTMLInputTypeAttribute, 
  CSSProperties, ChangeEvent, FormEvent } from 'react';
import classes from '@/styles/shared/text_field.module.css';
import { cls_join } from '@/functions/cls_join.func';

interface IComp {
  label: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  changeHandler: (value: string) => void;
  Sx?: CSSProperties;
  value_is_center?: boolean; // will text will be in the center
  Sx_input?: CSSProperties;
  multiline?: boolean;
}

export const TextField: FC<IComp> = ({
  label, value, changeHandler, type, Sx, value_is_center, Sx_input, multiline

}) => {

  const [isFocused, setIsFocused] = useState(false);

  const txtAreaRef = useRef<HTMLTextAreaElement|null>(null);

  const changeTxtAreaHandler = (e: FormEvent<HTMLTextAreaElement>) => {

    if(txtAreaRef.current) {

      txtAreaRef.current.style.height = "50px";
      txtAreaRef.current.style.height = `${txtAreaRef.current.scrollHeight+5}px`;

    }

  }


  return (
    <div
      className={
        isFocused ?
          cls_join([classes.root, classes.rootAfterActive]) :
          cls_join([classes.root, classes.rootAfter])
      }
      style={{ ...(Sx && Sx) }}
    >

      <div className={classes.container}>

        {
          !value &&
          <label className={classes.label}>
            {label}
          </label>
        }


        {
          multiline ?
            (
              <textarea className={classes.txtarea} ref={txtAreaRef}
                value={value}
                onChange={e => changeHandler(e.target.value)}
                onInput={e => changeTxtAreaHandler(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  ...(Sx_input && Sx_input),
                  ...(value_is_center && { textAlign: 'center' })
                }}
              />
            ) :
            (
              <input className={classes.input}
                type={type || 'text'} value={value}
                onChange={e => changeHandler(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  ...(Sx_input && Sx_input),
                  ...(value_is_center && { textAlign: 'center' })
                }}
              />
            )
        }

      </div>

    </div>
  )

};