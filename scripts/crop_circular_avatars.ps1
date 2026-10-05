Add-Type -AssemblyName System.Drawing

$img2Path = "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791212807262.png"
$src = [System.Drawing.Bitmap]::FromFile($img2Path)

$outDir = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\team"

$crops = @(
    @{ name = "client-ana-clara.png"; cx = 148; cy = 258; r = 65 },
    @{ name = "client-juliana.png"; cx = 147; cy = 411; r = 65 },
    @{ name = "client-fernanda.png"; cx = 146; cy = 561; r = 65 }
)

foreach ($c in $crops) {
    $size = $c.r * 2
    $bmp = new-object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $path = new-object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(0, 0, $size, $size)
    $g.SetClip($path)

    $srcX = $c.cx - $c.r
    $srcY = $c.cy - $c.r
    $srcRect = new-object System.Drawing.Rectangle($srcX, $srcY, $size, $size)
    $destRect = new-object System.Drawing.Rectangle(0, 0, $size, $size)

    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $outPath = Join-Path $outDir $c.name
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $path.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Circular crop saved: $outPath"
}

$src.Dispose()
