# Script pour supprimer automatiquement les recettes dupliquees
# Date: 27 Octobre 2025

Write-Host "Suppression des recettes dupliquees dans craft-recipes-data.js..." -ForegroundColor Cyan
Write-Host ""

$filePath = "src\config\craft-recipes-data.js"
$content = Get-Content $filePath -Raw

# Liste des IDs a supprimer (deja dans les fichiers specialises)
$idsToRemove = @(
    'iron_helmet',
    'leather_pants',
    'leather_boots',
    'potion_strength',
    'potion_agility',
    'grilled_fish',
    'seafood_feast',
    'enchanted_gloves'
)

foreach ($id in $idsToRemove) {
    Write-Host "Suppression de: $id" -ForegroundColor Yellow
    
    # Pattern pour trouver toute la recette (du { au },)
    $pattern = "(?s)\{\s*id:\s*'$id'.*?\},"
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, "    // $id supprime - voir fichiers specialises`n"
        Write-Host "  OK - Recette supprimee" -ForegroundColor Green
    }
    else {
        Write-Host "  ATTENTION - Recette non trouvee avec ce pattern" -ForegroundColor Red
    }
}

# Sauvegarder
Set-Content $filePath -Value $content

Write-Host ""
Write-Host "Termine! Fichier mis a jour." -ForegroundColor Green
Write-Host ""
Write-Host "Verifiez le fichier pour vous assurer que tout est OK" -ForegroundColor Yellow
