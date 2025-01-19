"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface I_Click {
  url?: string;
  remove_current_param?: boolean;
  param_name?: string;
  param_value?: string;
}

interface T_set_param {
  name: string;
  value: string|number;
  remove_rest?: boolean;
}

interface T_delete_param {
  name: string;
}

type T_handle_param =  { type: 'delete';   name: string; } |
{ type: 'insert';   name: string;  value: string|number; };

export const useSetURL = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const set_param = ({ name, value, remove_rest }: T_set_param) => {

    let current_url = new URLSearchParams(Array.from(searchParams.entries()));

    if(remove_rest) {
      current_url = new URLSearchParams();
    }

    current_url.set(name, `${value}`);

    const search = current_url.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);

  }

  const delete_param = ({ name }: T_delete_param) => {

    const current_url = new URLSearchParams(Array.from(searchParams.entries()))

    current_url.delete(name);

    const search = current_url.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  // handle multiple insert, delete operation at same time
  const handle_param = (param: T_handle_param[]) => {

    const current_url = new URLSearchParams(Array.from(searchParams.entries()));

    // handle insert/ delete options
    param.forEach(el => {

      if(el.type === 'insert') {
        current_url.set(el.name, `${el.value}`);
      }
      else if(el.type === 'delete') {
        current_url.delete(el.name);
      }


    })

    const search = current_url.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);

  }



  return {
    set_param, delete_param, handle_param
  }

};


/*

  const clickHanlder = (value: string) => {

    const current_url = new URLSearchParams(Array.from(searchParams.entries()))

    // if selected item is current_param, then remove the param item
    if(current_param_id == value) {
      current_url.delete(param_name);
    }
    else {
      current_url.set(param_name, value);
    }

    const search = current_url.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);

  }


*/