Add-Type -AssemblyName System.Drawing

$files = @(
    "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213372733.png",
    "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791213474419.png",
    "C:\Users\joaov\.gemini\antigravity-ide\brain\48966ffe-da4d-4784-bedc-6dc9116cf9bc\.user_uploaded\media_1791215184125.png"
)

foreach ($f in $files) {
    $img = [System.Drawing.Image]::FromFile($f)
    $name = [System.IO.Path]::GetFileName($f)
    $msg = $name + ": " + $img.Width + " x " + $img.Height
    Write-Output $msg
    $img.Dispose()
}
