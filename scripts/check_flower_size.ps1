Add-Type -AssemblyName System.Drawing
$flower = [System.Drawing.Image]::FromFile("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-flower.png")
Write-Output "Flower size: $($flower.Width) x $($flower.Height)"
$flower.Dispose()
