import React from 'react';
import { redirect } from 'next/navigation'
import { Dashboard_navigation_item } from '@/dashboard/navigation';

interface IParam {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams}: IParam) {

  redirect(`${Dashboard_navigation_item.products}/t_shirt`);

  return <h1> products page </h1>
}