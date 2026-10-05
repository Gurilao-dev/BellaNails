Add-Type -AssemblyName System.Drawing

$b1 = [System.Drawing.Image]::FromFile("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-header-banner-trimmed.png")
Write-Output "client-header-banner-trimmed: $($b1.Width) x $($b1.Height)"

# Let's save a thumbnail to view it
$thumb = new-object System.Drawing.Bitmap(500, 300)
$g = [System.Drawing.Graphics]::FromImage($thumb)
$g.DrawImage($b1, 0, 0, (new-object System.Drawing.Rectangle(0, 0, $b1.Width, 300)), [System.Drawing.GraphicsUnit]::Pixel)
$thumb.Save("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\debug_trimmed_thumb.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$thumb.Dispose()
$b1.Dispose()
