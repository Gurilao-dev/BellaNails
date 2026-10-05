$browser = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$out1 = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\verify_services.png"
Start-Process -FilePath $browser -ArgumentList "--headless=new --window-size=412,915 --screenshot=$out1 http://localhost:5174/#cliente/servicos" -Wait
Write-Output "Screenshot 1 saved: $out1"

$out2 = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\verify_schedule_clean.png"
Start-Process -FilePath $browser -ArgumentList "--headless=new --window-size=412,915 --screenshot=$out2 http://localhost:5174/?nomodal=1#cliente/agendamento" -Wait
Write-Output "Screenshot 2 saved: $out2"

$out3 = "c:\Users\joaov\OneDrive\Desktop\Bellary\WebSite\src\assets\client\verify_schedule.png"
Start-Process -FilePath $browser -ArgumentList "--headless=new --window-size=412,915 --screenshot=$out3 http://localhost:5174/#cliente/agendamento" -Wait
Write-Output "Screenshot 3 saved: $out3"
