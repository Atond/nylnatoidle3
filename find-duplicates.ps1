# Script pour identifier les doublons entre fichiers
# Date: 27 Octobre 2025

Write-Host "Analyse des doublons entre fichiers..." -ForegroundColor Cyan
Write-Host ""

$duplicates = @(
    'iron_chestplate',
    'iron_helmet',
    'leather_pants',
    'leather_boots',
    'potion_strength',
    'potion_agility',
    'grilled_fish',
    'seafood_feast',
    'enchanted_gloves'
)

Write-Host "Verification de la localisation des doublons:" -ForegroundColor Yellow
Write-Host ""

foreach ($id in $duplicates) {
    Write-Host "ID: $id" -ForegroundColor White
    
    $mainFile = "src\config\craft-recipes-data.js"
    $armorFile = "src\config\craft-recipes-armors.js"
    $accessoryFile = "src\config\craft-recipes-accessories.js"
    $consumableFile = "src\config\craft-recipes-consumables.js"
    
    $inMain = (Get-Content $mainFile -Raw) -match "id:\s*'$id'"
    $inArmor = (Get-Content $armorFile -Raw) -match "id:\s*'$id'"
    $inAccessory = (Get-Content $accessoryFile -Raw) -match "id:\s*'$id'"
    $inConsumable = (Get-Content $consumableFile -Raw) -match "id:\s*'$id'"
    
    if ($inMain) { Write-Host "  - Trouve dans craft-recipes-data.js" -ForegroundColor Red }
    if ($inArmor) { Write-Host "  - Trouve dans craft-recipes-armors.js" -ForegroundColor Green }
    if ($inAccessory) { Write-Host "  - Trouve dans craft-recipes-accessories.js" -ForegroundColor Green }
    if ($inConsumable) { Write-Host "  - Trouve dans craft-recipes-consumables.js" -ForegroundColor Green }
    
    Write-Host ""
}

Write-Host ""
Write-Host "RECOMMANDATION: Supprimer les recettes du fichier principal (data.js)" -ForegroundColor Yellow
Write-Host "car les fichiers specialises sont plus detailles." -ForegroundColor Yellow
