Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213474419.png")
Write-Output "Image 2 dimensions: $($img.Width) x $($img.Height)"

# In media_1791213474419.png:
# Let's inspect where the top banner starts and ends vertically.
# There is a black bar or status bar at the top, let's scan column x = 500 from y = 0 to 400:
for ($y = 0; $y -lt 350; $y += 5) {
    $c = $img.GetPixel(500, $y)
    $msg = "y=" + $y + " R=" + $c.R + " G=" + $c.G + " B=" + $c.B
    Write-Output $msg
}
$img.Dispose()
