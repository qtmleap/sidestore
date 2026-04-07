/**
 * iOSデバイスかどうかを判定
 * iPadOS 13以降のiPadは navigator.userAgent に "iPad" を含まないため、
 * navigator.platform と maxTouchPoints も確認する
 */
export const isIOSDevice = () => {
  const userAgent = navigator.userAgent
  // iPhone/iPod または古いiPad
  if (/iPhone|iPod|iPad/.test(userAgent)) {
    return true
  }
  // iPadOS 13以降のiPad（Macintosh として報告されるが、タッチ対応）
  if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1) {
    return true
  }
  return false
}

/**
 * OTAインストールを実行する
 * iOSデバイスのSafariでのみ動作
 */
export const installOTA = (appId: string | number) => {
  const manifestUrl = `${window.location.origin}/ipa/${appId}/manifest.plist`
  const installUrl = `itms-services://?action=download-manifest&url=${encodeURIComponent(manifestUrl)}`

  // iOSデバイス以外では動作しないことを通知
  if (!isIOSDevice()) {
    alert(`OTAインストールはiOSデバイスのSafariでのみ動作します。\n\nManifest URL:\n${manifestUrl}`)
    return
  }

  window.location.href = installUrl
}
