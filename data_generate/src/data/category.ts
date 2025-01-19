type T_baseCatList = {
  [key: string]: {
    name: string;
    subcat_list: string[];
  }
};

export const baseCategoryList: T_baseCatList = {
  'T-Shirts': {
    name: 't_shirt',
    subcat_list: ['57', '56', '81', '63']
  },
  'Fleece': {
    name: 'fleece',
    subcat_list: ['36', '404', '8']
  },
  'Wovens': {
    name: 'woven',
    subcat_list: ['57', '56']
  },
  'Sport Shirts': {
    name: 'sport_shirt',
    subcat_list: ['57', '56']
  }
}

export const subBaseCategoryList = {

  // Activewear
  '387': ['57', '56', '63'],
  

  // Womens
  '13': [
    'T-Shirts',
    'Fleece',
    'Wovens',
    'Sport Shirts'
  ]

}



export const feature_list = {


  // ==================  Sleeve Length ==================
  sleeve_length: {
    "81": "3/4 Sleeves",
    "56": "Long Sleeves",
    "57": "Short Sleeves",
    "63": "Sleeveless",
  },


  // ==================  style ==================
  style: {
    "387": "Activewear",
    "59": "Sweatshirts",
    "240": "Knit",
    "142": "Pullovers",
    "128": "Drawstrings",
  },

  
  // ==================  Feature ==================
  feature: {
    "404": "Zips",
    "36": "Hooded",
    "61": "Pockets",
  },
  

  // ================== Collar ==================
  collor: {
    "8": "Crewneck",
    "116": "Scoop Neck",
    "66": "V-Neck",
  },

  // ==================  Fit ==================
  fit: {
    "12": "Infants",
    "87": "Mens",
    "13": "Womens",
    "28": "Youth",
    "150": "Fitted",
    "156": "Side Seams",
    "157": "Relaxed",
  },

  // ================== Thickness ==================
  thickness: {
    "267": "3-3.9 oz",
    "268": "4-4.9 oz",
    "269": "5-5.9 oz",
    "270": "6-6.9 oz",
    "271": "7-7.9 oz",
    "272": "8-8.9 oz",
    "273": "9-9.9 oz"
  }

}



// const subCategoryList = {

//   "387": "Activewear",
//   "57": "Short Sleeves",
//   "56": "Long Sleeves",
//   "81": "3/4 Sleeves",
//   "63": "Sleeveless",
//   "36": "Hooded",
//   "404": "Zips",
//   "8": "Crewneck"
// }




const subCategory = [

  // =================== T-Shirts ===================
  "Short Sleeves", 
  "Long Sleeves", 
  "3/4 Sleeves", 
  "Sleeveless", 

  // =================== Fleece ===================
  "Hooded", 
  "Zips", 
  "Crewneck", 

  // =================== Wovens ===================
  "Short Sleeves", 
  "Long Sleeves", 


  // =================== Sport Shirts - Polos & Knits ===================
  "Short Sleeves",
  "Long Sleeves",


  // =================== subcat => Activewear ===================
  "Short Sleeves",
  "Long Sleeves",
  "Sleeveless",


  // =================== subcat => Womens ===================
  'T-Shirts',
  'Fleece',
  'Wovens',
  'Sport Shirts'

]



const exampleList = [

  // =================================== T-Shirts example ===================================
  {
    name: 'activewear example 01',
    baseCategory: 'TShirt',
    subCategories: [
      '57' // Short Sleeves
    ]
  },


  

  // =================================== activewear example ===================================
  {
    name: 'activewear example 01',
    baseCategory: 'TShirt',
    subCategories: [
      '387', // Activewear
      '57' // Short Sleeves
    ]
  },
  {
    name: 'activewear example 02',
    baseCategory: 'Athletics',
    subCategories: [
      '387', // Activewear
      '64' // Tank Tops
    ]
  }

]



