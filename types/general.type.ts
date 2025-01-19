
export type ty_page_params = { [key: string]: string | string[] | undefined };

export interface ty_page_url {
  // params: { slug: string }
  params: { [slug: string]: string }
  searchParams: ty_page_params
}

export type ty_fetch_status = 'success'| 'loading'| 'error';

export type ty_page_header_nav_item = {
  label: string;
  link: string|null;
}

export type ty_style_class = { readonly [key: string]: string }