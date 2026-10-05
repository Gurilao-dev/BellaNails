Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212740060.png"
$bmp = [System.Drawing.Bitmap]::FromFile($img1Path)

# Let's crop the header area (x: 0..576, y: 80..200) to inspect back button & title
$header = new-object System.Drawing.Bitmap(576, 140)
$g = [System.Drawing.Graphics]::FromImage($header)
$g.DrawImage($bmp, 0, 0, (new-object System.Drawing.Rectangle(0, 80, 576, 140)), [System.Drawing.GraphicsUnit]::Pixel)
$header.Save("c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\debug_schedule_header.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$header.Dispose()

# Back button center
for ($x = 20; $x -lt 70; $x += 5) {
    for ($y = 115; $y -lt 165; $y += 5) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 240 -or $c.G -lt 220) {
            $msg = "Pixel at x=" + $x + " y=" + $y + " R=" + $c.R + " G=" + $c.G + " B=" + $c.B
            Write-Output $msg
        }
    }
}

$bmp.Dispose()
