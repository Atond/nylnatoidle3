# Script de correction automatique des dropChance dans drops-data.js
# Applique les corrections identifiées par l'analyse

Write-Host "🔧 Correction automatique des dropChance..." -ForegroundColor Cyan

$filePath = "src\config\drops-data.js"
$backupPath = "src\config\drops-data.js.backup"

# Backup du fichier original
Copy-Item $filePath $backupPath -Force
Write-Host "✅ Backup créé: $backupPath" -ForegroundColor Green

$content = Get-Content $filePath -Raw

# Corrections spécifiques basées sur l'analyse

# 1. COMMON - Augmenter griffes_usees de 0.25 → 0.35
$content = $content -replace "griffes_usees:[\s\S]*?dropChance:\s*0\.25", "griffes_usees:`n    {`n        id: 'griffes_usees',`n        name: `"Griffes Usées`",`n        description: `"Griffes abîmées mais utilisables`",`n        icon: `"🗡️`",`n        type: `"resource`",`n        rarity: `"common`",`n        dropChance: 0.35"

# 2. UNCOMMON - Réduire robust_hide de 0.35 → 0.25
$content = $content -replace "(robust_hide:[\s\S]*?dropChance:\s*)0\.35", "`${1}0.25"

# 3. RARE - Réduire cuir_robuste de 0.60 → 0.12
$content = $content -replace "(cuir_robuste:[\s\S]*?dropChance:\s*)0\.60", "`${1}0.12"

# 4. RARE - Réduire crocs_venimeux de 0.50 → 0.10
$content = $content -replace "(crocs_venimeux:[\s\S]*?dropChance:\s*)0\.50", "`${1}0.10"

# 5. RARE - Réduire essence_vegetale_instable de 0.40 → 0.10
$content = $content -replace "(essence_vegetale_instable:[\s\S]*?dropChance:\s*)0\.40", "`${1}0.10"

# 6. UNCOMMON - Réduire plume_harpie de 0.32 → 0.28
$content = $content -replace "(plume_harpie:[\s\S]*?dropChance:\s*)0\.32", "`${1}0.28"

# 7. UNCOMMON - Réduire bois_impregne de 0.32 → 0.28
$content = $content -replace "(bois_impregne:[\s\S]*?dropChance:\s*)0\.32", "`${1}0.28"

# 8. UNCOMMON - Réduire seve_corrompue de 0.35 → 0.28
$content = $content -replace "(seve_corrompue:[\s\S]*?dropChance:\s*)0\.35", "`${1}0.28"

# 9. UNCOMMON - Réduire grimoire_dechire de 0.32 → 0.28
$content = $content -replace "(grimoire_dechire:[\s\S]*?dropChance:\s*)0\.32", "`${1}0.28"

# 10. RARE - Réduire sang_vampire de 0.45 → 0.12
$content = $content -replace "(sang_vampire:[\s\S]*?dropChance:\s*)0\.45", "`${1}0.12"

# 11. RARE - Réduire phylactere_brise de 0.40 → 0.10
$content = $content -replace "(phylactere_brise:[\s\S]*?dropChance:\s*)0\.40", "`${1}0.10"

# 12. RARE - Réduire pierre_gardienne de 0.50 → 0.12
$content = $content -replace "(pierre_gardienne:[\s\S]*?dropChance:\s*)0\.50", "`${1}0.12"

# 13. UNCOMMON - Réduire fragment_basalte de 0.32 → 0.28
$content = $content -replace "(fragment_basalte:[\s\S]*?dropChance:\s*)0\.32", "`${1}0.28"

# 14. UNCOMMON - Réduire ectoplasme_givre de 0.32 → 0.28
$content = $content -replace "(ectoplasma_givre:[\s\S]*?dropChance:\s*)0\.32", "`${1}0.28"

Write-Host "`n📝 Corrections appliquées:" -ForegroundColor Yellow
Write-Host "  ✅ griffes_usees: 0.25 → 0.35 (COMMON)"
Write-Host "  ✅ robust_hide: 0.35 → 0.25 (UNCOMMON)"
Write-Host "  ✅ cuir_robuste: 0.60 → 0.12 (RARE)"
Write-Host "  ✅ crocs_venimeux: 0.50 → 0.10 (RARE)"
Write-Host "  ✅ essence_vegetale_instable: 0.40 → 0.10 (RARE)"
Write-Host "  ✅ plume_harpie: 0.32 → 0.28 (UNCOMMON)"
Write-Host "  ✅ bois_impregne: 0.32 → 0.28 (UNCOMMON)"
Write-Host "  ✅ seve_corrompue: 0.35 → 0.28 (UNCOMMON)"
Write-Host "  ✅ grimoire_dechire: 0.32 → 0.28 (UNCOMMON)"
Write-Host "  ✅ sang_vampire: 0.45 → 0.12 (RARE)"
Write-Host "  ✅ phylactere_brise: 0.40 → 0.10 (RARE)"
Write-Host "  ✅ pierre_gardienne: 0.50 → 0.12 (RARE)"
Write-Host "  ✅ fragment_basalte: 0.32 → 0.28 (UNCOMMON)"
Write-Host "  ✅ ectoplasma_givre: 0.32 → 0.28 (UNCOMMON)"

# Sauvegarder le fichier modifié
Set-Content $filePath $content -NoNewline

Write-Host "`n✅ Fichier modifié avec succès!" -ForegroundColor Green
Write-Host "📌 Note: Les drops de BOSS (unique:true) gardent 100% de chance (normal)" -ForegroundColor Cyan
Write-Host "🔙 Backup disponible: $backupPath" -ForegroundColor Gray

Write-Host "`n🎯 Résumé des corrections:" -ForegroundColor Magenta
Write-Host "  • COMMON: 30-50% (ressources de base)"
Write-Host "  • UNCOMMON: 25-28% (ressources intermédiaires)"
Write-Host "  • RARE: 10-12% (ressources précieuses)"
Write-Host "  • ELITE: 50-70% (monstres difficiles)"
Write-Host "  • LEGENDARY BOSS: 100% (drops garantis)"
