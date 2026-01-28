/**
 * OTAインストールを実行する
 * iOSデバイスのSafariでのみ動作
 */
export const installOTA = (appId: string | number) => {
  const manifestUrl = `${window.location.origin}/ipa/${appId}/manifest.plist`
  const installUrl = `itms-services://?action=download-manifest&url=${encodeURIComponent(manifestUrl)}`

  // iOSデバイス以外では動作しないことを通知
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if (!isIOS) {
    alert(`OTAインストールはiOSデバイスのSafariでのみ動作します。\n\nManifest URL:\n${manifestUrl}`)
    return
  }

  window.location.href = installUrl
}

/**
 * iOSデバイスかどうかを判定
 */
export const isIOSDevice = () => /iPad|iPhone|iPod/.test(navigator.userAgent)
