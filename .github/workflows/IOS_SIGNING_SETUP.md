# iOS App Signing and R2 Upload Workflow

GitHub ActionsでiOSアプリに署名し、Cloudflare R2にアップロードするワークフローです。

## 前提条件

このワークフローは **fastlane match** を使用して証明書とプロビジョニングプロファイルを管理します。
事前にfastlane matchのセットアップが必要です。

## 必要なGitHub Secrets

ワークフローを実行する前に、以下のSecretsをGitHubリポジトリに設定してください：

### 必須のSecrets

1. **MATCH_PASSWORD**
   - fastlane matchで証明書を暗号化するためのパスワード
   - matchセットアップ時に設定したパスワード

2. **CLOUDFLARE_API_TOKEN**
   - CloudflareのAPIトークン（R2への書き込み権限が必要）

3. **CLOUDFLARE_ACCOUNT_ID**
   - CloudflareのアカウントID

> **Note**: matchリポジトリ（qtmleap/match）へのアクセスは `GITHUB_TOKEN` を自動的に使用するため、追加の認証設定は不要です。
> matchを`readonly`モードで使用するため、Apple IDの認証も不要です。
> CI環境のkeychain設定は `setup_ci` で自動的に行われます。

### オプションのSecrets

4. **R2_BUCKET_NAME**
    - R2バケット名（デフォルト: `app-distribution`）

## fastlane matchのセットアップ

### 1. 証明書リポジトリ

証明書とプロファイルは以下のプライベートリポジトリで管理されています：

```
https://github.com/qtmleap/match
```

### 2. matchの初期化

```bash
# fastlaneをインストール
gem install fastlane

# プロジェクトディレクトリで初期化
fastlane match init

# Gitリポジトリを選択し、URLを入力
# 例: https://github.com/your-org/ios-certificates.git
```

### 3. 証明書とプロファイルの生成/インポート

```bash
# 開発用証明書
fastlane match development

# Ad Hoc配布用
fastlane match adhoc

# App Store配布用
fastlane match appstore

# Enterprise配布用（Enterprise Programのみ）
fastlane match enterprise
```

### 4. Matchfileの設定例

```ruby
git_url("https://github.com/qtmleap/match.git")
storage_mode("git")
type("adhoc") # デフォルトタイプ

app_identifier(["com.example.app"])
username("your@apple.id.email")
team_id("XXXXXXXXXX")
```

## ワークフローの実行方法

1. GitHubリポジトリの "Actions" タブに移動
2. "Sign and Upload IPA to R2" ワークフローを選択
3. "Run workflow" をクリック
4. 以下のパラメータを入力：
   - **ipa_url**: 未署名のIPAファイルのダウンロードURL
   - **app_id**: アプリID（R2のパス用）
   - **version**: アプリのバージョン番号
   - **region**: リージョン（us または jp）
   - **certificate_type**: 証明書タイプ（adhoc, enterprise, または appstore）
   - **bundle_id**: アプリのBundle Identifier（例: com.example.app）
   - **team_id**: Apple Developer Team ID（10文字の英数字）

5. "Run workflow" をクリックして実行

## ワークフローの処理内容

1. ✅ 未署名のIPAファイルをダウンロード
2. 🔐 **fastlane matchで証明書とプロファイルを自動取得**
3. ✍️ **fastlane resignでIPAに再署名**
4. 📄 OTAインストール用のmanifest.plistを生成
5. ☁️ R2にアップロード
6. 📲 インストールリンクを生成

## R2バケット構造

```
app-distribution/
  app/
    us/
      {app_id}/
        v{version}.ipa
        manifest.plist
    jp/
      {app_id}/
        v{version}.ipa
        manifest.plist
```

## OTAインストール

ワークフロー完了後、以下のようなリンクが生成されます：

```
itms-services://?action=download-manifest&url=https://r2.example.com/app/{region}/{app_id}/manifest.plist
```

このリンクをiOSデバイスのSafariで開くと、アプリをインストールできます。

## トラブルシューティング

### fastlane認証エラーが発生する場合

- Apple IDとパスワードが正しいか確認
- App-Specific Passwordを使用しているか確認（2ファクタ認証有効時）
- `FASTLANE_SESSION` を設定して認証の頻度を減らす
- Apple Developer Programのメンバーシップが有効か確認

### プロビジョニングプロファイルのダウンロードエラー

- Bundle IDが正しいか確認
- Team IDが正しいか確認（Apple Developer Portal > Membership で確認）
- Apple Developer Portalで該当するプロビジョニングプロファイルが存在するか確認
- 証明書の有効期限を確認

### 署名エラーが発生する場合

- 証明書とプロビジョニングプロファイルが一致しているか確認
- プロビジョニングプロファイルの有効期限を確認
- Bundle IDが正しいか確認
- 証明書のタイプ（Development/Distribution/Enterprise）が正しいか確認

### R2アップロードエラーが発生する場合

- CloudflareのAPIトークンに正しい権限があるか確認
- バケット名が正しいか確認
- アカウントIDが正しいか確認

### manifest.plistのURL更新

[sign_and_upload_ipa.yaml](.github/workflows/sign_and_upload_ipa.yaml#L163)のURLを実際のR2ドメインに変更してください：

```yaml
<string>https://your-r2-domain.com/app/${{ inputs.region }}/${{ inputs.app_id }}/v${{ inputs.version }}.ipa</string>
```

## セキュリティに関する注意事項

- ⚠️ 証明書とプロビジョニングプロファイルは機密情報です
- ⚠️ GitHub Secretsに保存し、絶対にコードにコミットしないでください
- ⚠️ アクセスログを定期的に確認してください
- ⚠️ プロビジョニングプロファイルは定期的に更新してください
