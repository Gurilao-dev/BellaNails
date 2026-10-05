Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$src = [System.Drawing.Bitmap]::FromFile($img2Path)

$outDir = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\team"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$crops = @(
    @{ name = "client-ana-clara.png"; x = 76; y = 193; size = 144 },
    @{ name = "client-juliana.png"; x = 75; y = 346; size = 144 },
    @{ name = "client-fernanda.png"; x = 74; y = 494; size = 144 }
)

foreach ($c in $crops) {
    $bmp = new-object System.Drawing.Bitmap($c.size, $c.size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = new-object System.Drawing.Rectangle($c.x, $c.y, $c.size, $c.size)
    $destRect = new-object System.Drawing.Rectangle(0, 0, $c.size, $c.size)
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $outPath = Join-Path $outDir $c.name
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Saved $outPath"
}

$src.Dispose()
