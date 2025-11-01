# Script de Verification - Unicite des Recettes
# Date: 27 Octobre 2025

Write-Host "========================================"
Write-Host "VERIFICATION SYSTEME DE CRAFTING"
Write-Host "========================================"
Write-Host ""

$recipeFiles = @(
    "src\config\craft-recipes-data.js",
    "src\config\craft-recipes-armors.js",
    "src\config\craft-recipes-accessories.js",
    "src\config\craft-recipes-consumables.js",
    "src\config\craft-recipes-tanner.js"
)

Write-Host "1. VERIFICATION UNICITE DES IDs DE RECETTES"
Write-Host "--------------------------------------------"
Write-Host ""

$allIds = @()

foreach ($file in $recipeFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $pattern = 'id:\s*''([^'']+)'''
        $ids = [regex]::Matches($content, $pattern) | ForEach-Object { $_.Groups[1].Value }
        
        if ($ids.Count -gt 0) {
            $fileName = Split-Path $file -Leaf
            Write-Host "  $fileName : $($ids.Count) recettes"
            $allIds += $ids
        }
    }
}

Write-Host ""
Write-Host "TOTAL: $($allIds.Count) recettes trouvees"
Write-Host ""

# Verifier les doublons
$duplicates = $allIds | Group-Object | Where-Object { $_.Count -gt 1 }

if ($duplicates) {
    Write-Host "DOUBLONS DETECTES:" -ForegroundColor Red
    foreach ($dup in $duplicates) {
        Write-Host "  - ID '$($dup.Name)' apparait $($dup.Count) fois" -ForegroundColor Red
    }
}
else {
    Write-Host "Aucun doublon detecte - OK!" -ForegroundColor Green
}

Write-Host ""
Write-Host ""
Write-Host "2. DETECTION INCOHERENCES - CUIR EN BOIS"
Write-Host "--------------------------------------------"
Write-Host ""

$mainFile = "src\config\craft-recipes-data.js"
if (Test-Path $mainFile) {
    $content = Get-Content $mainFile -Raw
    
    $leatherRecipes = @('leather_chest', 'leather_helmet', 'leather_pants', 'leather_boots', 'work_gloves')
    $problems = 0
    
    foreach ($recipeId in $leatherRecipes) {
        if ($content -match "id:\s*'$recipeId'[\s\S]*?wood_oak") {
            Write-Host "  PROBLEME: '$recipeId' utilise 'wood_oak'" -ForegroundColor Red
            $problems++
        }
    }
    
    if ($problems -eq 0) {
        Write-Host "  Aucune incoherence detectee - OK!" -ForegroundColor Green
    }
    else {
        Write-Host ""
        Write-Host "  $problems recettes a corriger" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host ""
Write-Host "3. VERIFICATION FICHIERS SYSTEME"
Write-Host "--------------------------------------------"
Write-Host ""

$alchemyFiles = @(
    "src\config\alchemy-data.js",
    "src\js\alchemy-manager.js",
    "src\css\alchemy.css"
)

foreach ($file in $alchemyFiles) {
    if (Test-Path $file) {
        Write-Host "  A RENOMMER: $file" -ForegroundColor Yellow
    }
}

$transmutationFiles = @(
    "src\config\transmutation-data.js",
    "src\js\transmutation-manager.js",
    "src\css\transmutation.css"
)

$hasTransmutation = $false
foreach ($file in $transmutationFiles) {
    if (Test-Path $file) {
        Write-Host "  OK: $file" -ForegroundColor Green
        $hasTransmutation = $true
    }
}

if (-not $hasTransmutation) {
    Write-Host ""
    Write-Host "  Action requise: Renommer fichiers alchemy -> transmutation"
}

Write-Host ""
Write-Host "========================================"
Write-Host "VERIFICATION TERMINEE"
Write-Host "========================================"
Write-Host ""
