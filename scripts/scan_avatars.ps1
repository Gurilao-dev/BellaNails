Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img2Path)

# Let's find the circle bounding box for each avatar:
# Looking at the modal:
# Card 1: Ana Clara
# Card 2: Juliana
# Card 3: Fernanda
# Let's search in column x around 70 to 220 for the non-white/non-cream circle boundary.
# Let's scan along x = 150 from y = 180 to 650 to find where dark/hair pixels start and end.

for ($y = 200; $y -lt 650; $y += 5) {
    $c = $bmp.GetPixel(150, $y)
    # Output if it looks like portrait (R,G,B not almost white)
    if ($c.R -lt 240 -or $c.G -lt 230 -or $c.B -lt 230) {
        Write-Output "y=$y : R=$($c.R) G=$($c.G) B=$($c.B)"
    }
}
$bmp.Dispose()
