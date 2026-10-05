Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212740060.png")
$bmp = new-object System.Drawing.Bitmap(576, 92)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, (new-object System.Drawing.Rectangle(0, 0, 576, 92)), [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\test_schedule_banner_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$src.Dispose()
Write-Output "test_schedule_banner_clean saved"
