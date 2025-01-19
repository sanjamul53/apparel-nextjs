"use client";

import { use_query_invalidate_order } from "@/lib/react_query/query/order";


export const InvalideCache = () => {

  use_query_invalidate_order('all');

  return null;


};