import { PumpCoin, PumpDetail } from "common/types";

export async function getPumpList(): Promise<PumpCoin[]> {
  try {
    const res = await fetch("https://gmgn.ai/defi/quotation/v1/rank/sol/pump?limit=50&orderby=progress&direction=desc&pump=true", {
      cache: "no-store",
    });
    
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      console.error("Failed to fetch pump list:", res.status, res.statusText);
      return [];
    }
    
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.code === 0) {
        return data.data.rank;
      }
      console.warn("Unexpected response code:", data.code);
      return [];
    } else {
      const text = await res.text();
      console.error("Expected JSON but received:", text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching pump list:", error);
    return [];
  }
}

export async function getPumpDetail(addr: string): Promise<PumpDetail | null> {
  try {
    const res = await fetch(`https://gmgn.ai/defi/quotation/v1/tokens/sol/${addr}`);
    
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      console.error("Failed to fetch pump detail:", res.status, res.statusText);
      return null;
    }
    
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (data.code === 0) {
        return data.data.token;
      }
      console.warn("Unexpected response code:", data.code);
      return null;
    } else {
      const text = await res.text();
      console.error("Expected JSON but received:", text);
      return null;
    }
  } catch (error) {
    console.error("Error fetching pump detail:", error);
    return null;
  }
}
