# PowerShell script to clean inline styles from HTML
$htmlPath = "e:\WebApp\public\index.html"
$content = Get-Content $htmlPath -Raw

Write-Host "Original file size: $($content.Length) bytes"

# Remove problematic inline style attributes but keep the structure
# Remove translate, rotate, scale, transform styles that are causing overlaps
$cleaned = $content -replace 'style="[^"]*transform:[^"]*"', ''
$cleaned = $cleaned -replace 'style="[^"]*translate:[^"]*"', ''
$cleaned = $cleaned -replace 'style="[^"]*opacity: 0[^"]*"', ''
$cleaned = $cleaned -replace 'style="[^"]*visibility: hidden[^"]*"', ''

# Remove empty style attributes
$cleaned = $cleaned -replace '\s+style=""', ''

Write-Host "Cleaned file size: $($cleaned.Length) bytes"

# Save cleaned version
Set-Content -Path $htmlPath -Value $cleaned -NoNewline

Write-Host "HTML cleaned successfully!"
Write-Host "Restart the server to see changes"
