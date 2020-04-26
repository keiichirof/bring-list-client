import * as Axios from "axios";

// Axiosをラップしたクラス
export class AxiosAdapter {
  private axios: Axios.AxiosInstance;

  constructor(axios: Axios.AxiosInstance) {
    this.axios = axios;
  }

  // Getリクエストを送る
  Get(url: string, configs?: Configs) {
    return this.axios.get(url, configs);
  }

  // Postリクエストを送る
  // dataに送信したいデータを入れる
  Post(url: string, configs?: Configs, data?: unknown) {
    return this.axios.post(url, data, configs);
  }

  // Putリクエストを送る
  // dataに送信したいデータを入れる
  Put(url: string, configs?: Configs, data?: unknown) {
    return this.axios.put(url, data, configs);
  }

  // Deleteリクエストを送る
  Delete(url: string, configs?: Configs) {
    return this.axios.delete(url, configs);
  }
}

// デフォルトで適応されるAxiosの取得
export function GetDefaultAxios(baseURL: string) {
  return Axios.default.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    responseType: "json"
  });
}

// JWT認証のためtokenが必要な時に使う
export function GetAxiosWithToken(baseURL: string, token: string = "") {
  return Axios.default.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`
    },
    responseType: "json"
  });
}

interface Configs {
  params?: unknown;
  headers?: { [key: string]: string };
}
