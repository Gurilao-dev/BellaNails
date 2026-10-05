Add-Type -AssemblyName System.Drawing

$f = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791207265086.png"
$src = [System.Drawing.Bitmap]::FromFile($f)

$bmp = new-object System.Drawing.Bitmap(576, 200)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, (new-object System.Drawing.Rectangle(0, 0, 576, 200)), [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\test_old_banner.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()
