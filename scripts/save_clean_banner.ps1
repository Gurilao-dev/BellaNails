Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212740060.png")

# Let's crop width 576, height 96
$h = 96
$bmp = new-object System.Drawing.Bitmap(576, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$g.DrawImage($src, 0, 0, (new-object System.Drawing.Rectangle(0, 0, 576, $h)), [System.Drawing.GraphicsUnit]::Pixel)

$dest = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\client-services-banner.png"
$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()
Write-Output "Clean banner saved to $dest"
