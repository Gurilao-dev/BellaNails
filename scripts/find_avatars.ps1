Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img2Path)

# In Img2 (940 x 733):
# The cards are stacked vertically:
# Card 1: Ana Clara
# Card 2: Juliana
# Card 3: Fernanda
# Let's inspect where the card borders or avatars are located.
# The avatar is a circle on the left side of each card.
# Let's crop a test strip around x: 60 to 220, y: 200 to 650

$outDir = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client"

# Let's save a thumbnail of the cards or crop them precisely.
# Let's sample pixel colors or crop the three avatars:
# Card 1 avatar approximate: y around 270-390, x around 70-190
# Card 2 avatar approximate: y around 470-590 ...
# Let's crop a bounding strip to check coordinates:
$strip = new-object System.Drawing.Bitmap(300, 500)
$g = [System.Drawing.Graphics]::FromImage($strip)
$g.DrawImage($bmp, 0, 0, (new-object System.Drawing.Rectangle(50, 180, 300, 500)), [System.Drawing.GraphicsUnit]::Pixel)
$strip.Save("$outDir\avatar_strip_debug.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$strip.Dispose()
$bmp.Dispose()
Write-Output "Debug strip saved."
