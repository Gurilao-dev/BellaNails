Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img2Path)

# Let's inspect horizontal span around y = 265 (Ana Clara center)
# y = 415 (Juliana center)
# y = 565 (Fernanda center)

function Find-XSpan($yVal) {
    $minX = 9999
    $maxX = -1
    for ($x = 50; $x -lt 300; $x++) {
        $c = $bmp.GetPixel($x, $yVal)
        # Check if pixel is inside the circular avatar (not card background which is #FFF5F6 or similar)
        # Card background in Img2:
        if ($c.R -lt 245 -or $c.G -lt 230 -or $c.B -lt 230) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
        }
    }
    Write-Output "Y=$yVal => minX=$minX, maxX=$maxX, width=$($maxX - $minX)"
}

Find-XSpan 265
Find-XSpan 415
Find-XSpan 565

$bmp.Dispose()
