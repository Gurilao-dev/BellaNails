Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img2Path)

function Find-YSpan($yStart, $yEnd) {
    $minY = 9999
    $maxY = -1
    for ($y = $yStart; $y -le $yEnd; $y++) {
        $c = $bmp.GetPixel(147, $y)
        if ($c.R -lt 240 -or $c.G -lt 230 -or $c.B -lt 230) {
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
    Write-Output "Y span: minY=$minY, maxY=$maxY, height=$($maxY - $minY)"
}

Write-Output "Ana Clara:"
Find-YSpan 180 340

Write-Output "Juliana:"
Find-YSpan 340 490

Write-Output "Fernanda:"
Find-YSpan 490 640

$bmp.Dispose()
