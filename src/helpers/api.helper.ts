'use server';
import { cookies } from 'next/headers';
interface IOptions {
  url: string;
  options: RequestInit;
}

export const api = async <TypeResult>({
  url,
  options,
}: IOptions): Promise<TypeResult> => {
  let headers: HeadersInit;

  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Cookie: cookies().toString(),
    };
  } else {
    headers = {
      ...options.headers,
      'Content-Type': 'application/json', // Set appropriate content type
      Cookie: cookies().toString(),
    };
  }

  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  const response = await fetch(url, dataOptions);

  const result: TypeResult = await response.json();

  return result;
};
