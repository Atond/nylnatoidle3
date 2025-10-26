# ⚖️ Script d'équilibrage : Diviser Intelligence par 4
# Pour égaliser les dégâts Mage/Archer et garder Force/Int équilibrés

$ErrorActionPreference = "Stop"

Write-Host "⚖️ ÉQUILIBRAGE DES STATS - DIVISION INTELLIGENCE" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "src\config\craft-recipes-armors.js",
    "src\config\craft-recipes-accessories.js",
    "src\config\craft-recipes-extended.js",
    "src\config\craft-recipes-consumables.js"
)

# Créer une sauvegarde
$backupDir = "archive\backup-balance-$(Get-Date -Format 'yyyy-MM-dd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Write-Host "📦 Sauvegarde créée: $backupDir" -ForegroundColor Green
Write-Host ""

$totalModifications = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📄 Traitement: $file" -ForegroundColor Yellow
        
        # Sauvegarde
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        
        $content = Get-Content $file -Raw
        $modCount = 0
        
        # Trouver toutes les valeurs d'intelligence et les diviser par 4
        $pattern = '(\s+intelligence:\s*)(\d+)'
        $regexOptions = [System.Text.RegularExpressions.RegexOptions]::Multiline
        $matchCollection = [regex]::Matches($content, $pattern, $regexOptions)
        
        # Traiter de la fin vers le début pour éviter les décalages
        for ($i = $matchCollection.Count - 1; $i -ge 0; $i--) {
            $match = $matchCollection[$i]
            
            $whitespace = $match.Groups[1].Value
            $oldValue = [int]$match.Groups[2].Value
            $newValue = [math]::Round($oldValue / 4)
            
            # Garantir au moins 1 (éviter 0)
            if ($newValue -lt 1) { $newValue = 1 }
            
            # Remplacer
            $oldText = $match.Value
            $newText = "${whitespace}${newValue}"
            
            $content = $content.Substring(0, $match.Index) + $newText + $content.Substring($match.Index + $match.Length)
            
            $modCount++
            
            if ($modCount -le 5) {
                Write-Host "  ✅ $oldValue → $newValue" -ForegroundColor Green
            }
        }
        
        if ($modCount -gt 5) {
            Write-Host "  ... et $($modCount - 5) autres modifications" -ForegroundColor Gray
        }
        
        if ($modCount -gt 0) {
            Set-Content $file $content -NoNewline
            $totalModifications += $modCount
            Write-Host "  📊 Total: $modCount valeurs divisées par 4" -ForegroundColor Cyan
        }
        else {
            Write-Host "  ⏭️  Aucune modification" -ForegroundColor Gray
        }
        
        Write-Host ""
    }
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🎉 ÉQUILIBRAGE TERMINÉ!" -ForegroundColor Green
Write-Host "📊 Total modifications: $totalModifications" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Nouvelles moyennes estimées:" -ForegroundColor Yellow
Write-Host "  💪 Force: ~10 (inchangé)" -ForegroundColor Gray
Write-Host "  🧠 Intelligence: ~20 (78.8 ÷ 4 = 19.7)" -ForegroundColor Magenta
Write-Host "  ⚡ Agilité: ~40 (inchangé)" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Équilibrage:" -ForegroundColor Yellow
Write-Host "  🏹 Archer: Dégâts élevés (Force + Critiques Agilité)" -ForegroundColor Green
Write-Host "  🧙 Mage: Dégâts élevés (Intelligence)" -ForegroundColor Green
Write-Host "  ⚔️  Guerrier: Dégâts moyens, Tank (Force + Endurance)" -ForegroundColor Green
Write-Host "  ✨ Prêtre: Dégâts faibles, Heal (Intelligence faible + Wisdom)" -ForegroundColor Green
Write-Host ""
Write-Host "💾 Restauration: Copy-Item $backupDir\* src\config\ -Force" -ForegroundColor Gray
Write-Host ""
