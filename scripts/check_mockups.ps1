Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212740060.png"
$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"

$img1 = [System.Drawing.Image]::FromFile($img1Path)
$img2 = [System.Drawing.Image]::FromFile($img2Path)

Write-Output "Img1 (Schedule): $($img1.Width) x $($img1.Height)"
Write-Output "Img2 (Modal): $($img2.Width) x $($img2.Height)"

$img1.Dispose()
$img2.Dispose()
