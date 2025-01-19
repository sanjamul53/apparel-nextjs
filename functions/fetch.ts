type T_param = {
  url: string,
  methodType: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: { [key: string]: any },
  is_external?: boolean;
  options?: RequestInit
};

export async function Fetch<T>({
  url, methodType, data, is_external, options
}: T_param): Promise<T> {

  let targetUrl = url;

  // if request to next/api route
  if(!is_external) {

    if (!url.startsWith('/')) {
      targetUrl = `/${url}`;
    }

    const nextUrl = process.env.NEXT_URL || '';

    targetUrl = `${nextUrl}/api${url}`;

    // targetUrl = `/api${url}`;
    // targetUrl = `http://localhost:3000/api${url}`;
  }

  const resS = await fetch(targetUrl, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    ...(['POST', 'PATCH'].includes(methodType) && data && { 
      body: JSON.stringify(data) 
    }),

    ...(options ? options: {})
    

  });

  if (!resS.ok) {
    const errRes = await resS.json();
    throw new Error(errRes || 'error');
  }

  const resSData = await resS.json() as T;
  return resSData;

}