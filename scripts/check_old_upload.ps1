Add-Type -AssemblyName System.Drawing

$f = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791207265086.png"
$img = [System.Drawing.Image]::FromFile($f)
Write-Output "media_1791207265086.png size: $($img.Width) x $($img.Height)"
$img.Dispose()
