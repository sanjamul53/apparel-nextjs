type T_color = {
  name: string;
  hex?: string;
  url?: string;
}

export const color_family_list: T_color[] = [
  
  {
    name: 'Blacks',
    hex: 'rgb(15, 8, 8)'
  },
  {
    name: 'Blues',
    hex: 'rgb(52, 109, 192)'
  },
  {
    name: 'Browns',
    hex: 'rgb(100, 57, 44)'
  },
  {
    name: 'Greens',
    hex: 'rgb(59, 141, 43)'
  },
  {
    name: 'Greys',
    hex: 'rgb(177, 177, 177)'
  },
  {
    name: 'Oranges',
    hex: 'rgb(228, 114, 37)'
  },
  {
    name: 'Pinks',
    hex: 'rgb(255, 110, 207)'
  },
  {
    name: 'Purples',
    hex: 'rgb(107, 28, 184)'
  },
  {
    name: 'Reds',
    hex: 'rgb(219, 24, 24)'
  },
  {
    name: 'Whites',
    hex: 'rgb(248, 248, 248)'
  },
  {
    name: 'Yellows',
    hex: 'rgb(255, 255, 106)'
  },
  // "Camouflage": {},
  // "Neutrals": {},

]


/*

type T_color = {
  [key: string]: {
    hex?: string;
    url?: string;
  }
}

export const color_family_list: T_color = {
  
  "Blacks": {
    hex: 'rgb(15, 8, 8)'
  },
  "Blues": {
    hex: 'rgb(52, 109, 192)'
  },
  "Browns": {
    hex: 'rgb(100, 57, 44)'
  },
  "Greens": {
    hex: 'rgb(59, 141, 43)'
  },
  "Greys": {
    hex: 'rgb(177, 177, 177)'
  },
  "Oranges": {
    hex: 'rgb(228, 114, 37)'
  },
  "Pinks": {
    hex: 'rgb(255, 110, 207)'
  },
  "Purples": {
    hex: 'rgb(107, 28, 184)'
  },
  "Reds": {
    hex: 'rgb(219, 24, 24)'
  },
  "Whites": {
    hex: 'rgb(248, 248, 248)'
  },
  "Yellows": {
    hex: 'rgb(255, 255, 106)'
  },
  "Camouflage": {},
  "Neutrals": {},

}

*/