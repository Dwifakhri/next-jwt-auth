/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export async function GET() {
  try {
    const res = await api.get("/protected");
    return new Response(JSON.stringify(res.data), {
      status: res.data.status,
      statusText: res.data.message
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error }), {
      status: error.response.status
    });
  }
}
