# 🔧 Script de correction : Fusionner les doublons d'intelligence
# Additionne les deux valeurs intelligence quand il y en a deux

$ErrorActionPreference = "Stop"

Write-Host "🔧 FUSION DES DOUBLONS D'INTELLIGENCE" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "src\config\craft-recipes-armors.js",
    "src\config\craft-recipes-accessories.js",
    "src\config\craft-recipes-extended.js",
    "src\config\craft-recipes-consumables.js"
)

$totalFusions = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📄 Traitement: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        $fusionCount = 0
        
        # Pattern pour trouver les blocs stats avec doublons intelligence
        # Cherche: intelligence: X, ... intelligence: Y,
        $pattern = '(intelligence:\s*)(\d+)(,\s*\n(?:.*\n)*?\s*intelligence:\s*)(\d+)'
        
        $regexOptions = [System.Text.RegularExpressions.RegexOptions]::Multiline
        $matchCollection = [regex]::Matches($content, $pattern, $regexOptions)
        
        # Traiter de la fin vers le début pour éviter les décalages d'index
        for ($i = $matchCollection.Count - 1; $i -ge 0; $i--) {
            $match = $matchCollection[$i]
            
            $firstValue = [int]$match.Groups[2].Value
            $secondValue = [int]$match.Groups[4].Value
            $sumValue = $firstValue + $secondValue
            
            # Construire le remplacement
            $oldText = $match.Value
            $newText = "intelligence: $sumValue"
            
            # Remplacer dans le contenu
            $content = $content.Substring(0, $match.Index) + $newText + $content.Substring($match.Index + $match.Length)
            
            $fusionCount++
            
            Write-Host "  ✅ Fusion: intelligence: $firstValue + intelligence: $secondValue = intelligence: $sumValue" -ForegroundColor Green
        }
        
        if ($fusionCount -gt 0) {
            Set-Content $file $content -NoNewline
            $totalFusions += $fusionCount
            Write-Host "  📊 Total fusions: $fusionCount" -ForegroundColor Cyan
        }
        else {
            Write-Host "  ⏭️  Aucune fusion nécessaire" -ForegroundColor Gray
        }
        
        Write-Host ""
    }
}

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎉 FUSION TERMINÉE!" -ForegroundColor Green
Write-Host "📊 Total fusions: $totalFusions" -ForegroundColor Cyan
Write-Host ""
