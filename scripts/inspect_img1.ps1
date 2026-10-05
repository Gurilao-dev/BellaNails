Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212740060.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img1Path)

Write-Output "Image 1 size: $($bmp.Width) x $($bmp.Height)"

# Let's inspect where the banner ends and white card begins:
# Scan x = 288 (center) from y = 50 to 200
for ($y = 50; $y -lt 180; $y += 5) {
    $c = $bmp.GetPixel(288, $y)
    Write-Output "y=$y : R=$($c.R) G=$($c.G) B=$($c.B)"
}

$bmp.Dispose()
