Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213474419.png")

# Let's crop the pure banner from media_1791213474419.png:
# y starts at 200 (end of black bar).
# Where does the lowest part of the wave end?
# Let's scan column x = 50 from y = 350 to 550:
for ($y = 350; $y -lt 550; $y += 5) {
    $c = $img.GetPixel(50, $y)
    $msg = "x=50 y=" + $y + " R=" + $c.R + " G=" + $c.G + " B=" + $c.B
    Write-Output $msg
}

$img.Dispose()
