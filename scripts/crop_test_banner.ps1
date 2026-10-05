Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213474419.png")

# Let's crop y from 200 to 410, width 1024
$h = 210
$bmp = new-object System.Drawing.Bitmap(1024, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, (new-object System.Drawing.Rectangle(0, 200, 1024, $h)), [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\test_clean_banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Output "test_clean_banner saved"
