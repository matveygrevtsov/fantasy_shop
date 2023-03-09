import { Base64 } from "js-base64";

export function decodeBase64(str: string): any {
  if (!str) return undefined;

  try {
    const dataDecoded = Base64.decode(str);
    const data = JSON.parse(dataDecoded);
    return data;
  } catch (error) {
    return undefined;
  }
}

export function encodeBase64(data: any): string {
  return Base64.encodeURI(JSON.stringify(data));
}
