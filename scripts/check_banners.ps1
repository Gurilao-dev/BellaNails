Add-Type -AssemblyName System.Drawing

$b1 = [System.Drawing.Image]::FromFile("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-header-banner-trimmed.png")
$b2 = [System.Drawing.Image]::FromFile("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-header-banner.png")
$b3 = [System.Drawing.Image]::FromFile("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-services-banner.png")

Write-Output "b1 trimmed: $($b1.Width) x $($b1.Height)"
Write-Output "b2: $($b2.Width) x $($b2.Height)"
Write-Output "b3 services: $($b3.Width) x $($b3.Height)"

$b1.Dispose()
$b2.Dispose()
$b3.Dispose()
