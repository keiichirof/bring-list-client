// 環境変数を管理するクラス
export class EnvManager {
  // Apiのurlを取得
  static get ApiUrl(): string {
    return process.env.API_URL || "";
  }
}
