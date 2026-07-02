import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body,
  });

  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.delete("content-length");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
