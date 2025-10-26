# 🧹 Script de nettoyage des stats obsolètes dans les recettes
# Remplace spellPower → intelligence, supprime attackSpeed et castSpeed

$ErrorActionPreference = "Stop"

Write-Host "🧹 NETTOYAGE DES STATS OBSOLÈTES" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Fichiers à traiter
$files = @(
    "src\config\craft-recipes-armors.js",
    "src\config\craft-recipes-accessories.js",
    "src\config\craft-recipes-extended.js",
    "src\config\craft-recipes-consumables.js",
    "src\config\craft-recipes-data.js"
)

# Créer un dossier de sauvegarde
$backupDir = "archive\backup-stats-cleanup-$(Get-Date -Format 'yyyy-MM-dd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Write-Host "📦 Sauvegarde créée dans: $backupDir" -ForegroundColor Green
Write-Host ""

$totalChanges = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📄 Traitement: $file" -ForegroundColor Yellow
        
        # Sauvegarde
        $backupPath = Join-Path $backupDir (Split-Path $file -Leaf)
        Copy-Item $file $backupPath
        
        # Lire le contenu
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        # Compteurs
        $spellPowerCount = 0
        $attackSpeedCount = 0
        $castSpeedCount = 0
        
        # 1. REMPLACER spellPower → intelligence
        # On garde la même valeur car intelligence = dégâts magiques directs
        $pattern = '(\s+)spellPower:\s*(\d+)(,?)'
        $matches = [regex]::Matches($content, $pattern)
        $spellPowerCount = $matches.Count
        
        foreach ($match in $matches) {
            $whitespace = $match.Groups[1].Value
            $value = $match.Groups[2].Value
            $comma = $match.Groups[3].Value
            
            # Remplacer par intelligence avec la même valeur
            $oldText = $match.Value
            $newText = "${whitespace}intelligence: $value$comma"
            $content = $content.Replace($oldText, $newText)
        }
        
        # 2. SUPPRIMER attackSpeed (lignes complètes)
        $pattern = '\s+attackSpeed:\s*\d+,?\s*\n'
        $matches = [regex]::Matches($content, $pattern)
        $attackSpeedCount = $matches.Count
        $content = [regex]::Replace($content, $pattern, '')
        
        # 3. SUPPRIMER castSpeed (lignes complètes)
        $pattern = '\s+castSpeed:\s*\d+,?\s*\n'
        $matches = [regex]::Matches($content, $pattern)
        $castSpeedCount = $matches.Count
        $content = [regex]::Replace($content, $pattern, '')
        
        # 4. Nettoyer les virgules orphelines (éviter errors syntax)
        # Si on a deux virgules consécutives après suppression
        $content = $content -replace ',(\s*),', ','
        
        # 5. Écrire le nouveau contenu
        if ($content -ne $originalContent) {
            Set-Content $file $content -NoNewline
            
            $fileChanges = $spellPowerCount + $attackSpeedCount + $castSpeedCount
            $totalChanges += $fileChanges
            
            Write-Host "  ✅ spellPower → intelligence: $spellPowerCount" -ForegroundColor Green
            Write-Host "  ❌ attackSpeed supprimés: $attackSpeedCount" -ForegroundColor Red
            Write-Host "  ❌ castSpeed supprimés: $castSpeedCount" -ForegroundColor Red
            Write-Host "  📊 Total modifications: $fileChanges" -ForegroundColor Cyan
        }
        else {
            Write-Host "  ⏭️  Aucune modification nécessaire" -ForegroundColor Gray
        }
        
        Write-Host ""
    }
    else {
        Write-Host "⚠️  Fichier non trouvé: $file" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "🎉 NETTOYAGE TERMINÉ!" -ForegroundColor Green
Write-Host "📊 Total modifications: $totalChanges" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Pour restaurer les fichiers originaux:" -ForegroundColor Yellow
Write-Host "   Copy-Item $backupDir\* src\config\ -Force" -ForegroundColor Gray
Write-Host ""
