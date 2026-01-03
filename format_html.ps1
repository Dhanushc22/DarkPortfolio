# PowerShell script to format the HTML file properly
$htmlPath = "e:\WebApp\public\index.html"
$content = Get-Content $htmlPath -Raw

# This will use an online HTML formatter or we can do manual formatting
# For now, let's create a properly structured version

Write-Host "HTML file has $($content.Length) characters"
Write-Host "Processing and formatting..."

# Save a backup
Copy-Item $htmlPath "$htmlPath.backup" -Force
Write-Host "Backup created at $htmlPath.backup"
