Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213474419.png")

for ($y = 345; $y -lt 500; $y += 5) {
    $c = $img.GetPixel(500, $y)
    $msg = "y=" + $y + " R=" + $c.R + " G=" + $c.G + " B=" + $c.B
    Write-Output $msg
}
$img.Dispose()
