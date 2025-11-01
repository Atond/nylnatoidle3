# Script de Verification - Unicite des Recettes & Ressources
# Date: 27 Octobre 2025
# Objectif: Detecter doublons et incoherences

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VERIFICATION SYSTEME DE CRAFTING" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Chemins des fichiers de recettes
$recipeFiles = @(
    "src\config\craft-recipes-data.js",
    "src\config\craft-recipes-armors.js",
    "src\config\craft-recipes-accessories.js",
    "src\config\craft-recipes-consumables.js",
    "src\config\craft-recipes-tanner.js",
    "src\config\craft-recipes-extended.js"
)

# Fonction pour extraire les IDs des recettes
function Get-RecipeIds {
    param([string]$filePath)
    
    if (-not (Test-Path $filePath)) {
        Write-Host "Fichier non trouve: $filePath" -ForegroundColor Yellow
        return @()
    }
    
    $content = Get-Content $filePath -Raw
    $pattern = 'id:\s*''([^'']+)'''
    $ids = [regex]::Matches($content, $pattern) | ForEach-Object { $_.Groups[1].Value }
    
    return $ids
}

# Fonction pour extraire les resourceIds des materiaux
function Get-ResourceIds {
    param([string]$filePath)
    
    if (-not (Test-Path $filePath)) {
        return @()
    }
    
    $content = Get-Content $filePath -Raw
    $pattern = 'resourceId:\s*''([^'']+)'''
    $resourceIds = [regex]::Matches($content, $pattern) | ForEach-Object { $_.Groups[1].Value }
    
    return $resourceIds | Select-Object -Unique
}

Write-Host "📦 1. VÉRIFICATION UNICITÉ DES IDs DE RECETTES" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$allIds = @()
$fileStats = @()

foreach ($file in $recipeFiles) {
    $ids = Get-RecipeIds $file
    
    if ($ids.Count -gt 0) {
        $fileName = Split-Path $file -Leaf
        Write-Host "  📄 $fileName" -ForegroundColor White
        Write-Host "     └─ Recettes: $($ids.Count)" -ForegroundColor Gray
        
        $fileStats += [PSCustomObject]@{
            File  = $fileName
            Count = $ids.Count
        }
        
        $allIds += $ids
    }
}

Write-Host ""
Write-Host "  📊 TOTAL: $($allIds.Count) recettes trouvées" -ForegroundColor Cyan
Write-Host ""

# Vérifier les doublons
$duplicates = $allIds | Group-Object | Where-Object { $_.Count -gt 1 }

if ($duplicates) {
    Write-Host "❌ DOUBLONS DÉTECTÉS !" -ForegroundColor Red
    Write-Host ""
    foreach ($dup in $duplicates) {
        Write-Host "  🔴 ID '$($dup.Name)' apparaît $($dup.Count) fois" -ForegroundColor Red
    }
    Write-Host ""
}
else {
    Write-Host "✅ Aucun doublon détecté - Tous les IDs sont uniques !" -ForegroundColor Green
    Write-Host ""
}

Write-Host ""
Write-Host "🌲 2. VÉRIFICATION RESSOURCES UTILISÉES DANS RECETTES" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$allResources = @()
foreach ($file in $recipeFiles) {
    $resources = Get-ResourceIds $file
    $allResources += $resources
}

$uniqueResources = $allResources | Select-Object -Unique | Sort-Object
Write-Host "  📊 Ressources différentes utilisées: $($uniqueResources.Count)" -ForegroundColor Cyan
Write-Host ""

# Afficher les 20 ressources les plus utilisées
$topResources = $allResources | Group-Object | Sort-Object Count -Descending | Select-Object -First 20

Write-Host "  🏆 TOP 20 Ressources les plus utilisées:" -ForegroundColor Yellow
Write-Host ""
foreach ($res in $topResources) {
    $barLength = [Math]::Min(30, [int]($res.Count / $topResources[0].Count * 30))
    $bar = "█" * $barLength
    Write-Host ("    {0,-30} {1,-30} {2}" -f $res.Name, $bar, $res.Count) -ForegroundColor White
}

Write-Host ""
Write-Host ""
Write-Host "🔍 3. DÉTECTION INCOHÉRENCES - CUIR EN BOIS" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Chercher les recettes de cuir utilisant du bois
$leatherRecipes = @('leather_chest', 'leather_helmet', 'leather_pants', 'leather_boots', 'work_gloves')

$mainRecipeFile = "src\config\craft-recipes-data.js"
if (Test-Path $mainRecipeFile) {
    $content = Get-Content $mainRecipeFile -Raw
    
    $problemsFound = 0
    foreach ($recipeId in $leatherRecipes) {
        if ($content -match "id:\s*'$recipeId'[\s\S]*?wood_oak") {
            Write-Host "  ❌ '$recipeId' utilise 'wood_oak' au lieu de cuir" -ForegroundColor Red
            $problemsFound++
        }
    }
    
    if ($problemsFound -eq 0) {
        Write-Host "  ✅ Aucune incohérence détectée" -ForegroundColor Green
    }
    else {
        Write-Host ""
        Write-Host "  ⚠️  $problemsFound recettes à corriger" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  ⚠️  Fichier principal non trouvé" -ForegroundColor Yellow
}

Write-Host ""
Write-Host ""
Write-Host "📊 4. STATISTIQUES PAR FICHIER" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

foreach ($stat in $fileStats | Sort-Object Count -Descending) {
    $percentage = [Math]::Round(($stat.Count / $allIds.Count) * 100, 1)
    $barLength = [int]($percentage / 2)
    $bar = "█" * $barLength
    Write-Host ("  {0,-35} {1,-25} {2,4} ({3,5}%)" -f $stat.File, $bar, $stat.Count, $percentage) -ForegroundColor White
}

Write-Host ""
Write-Host ""
Write-Host "🔧 5. VÉRIFICATION FICHIERS SYSTÈME" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$systemFiles = @{
    "alchemy-data.js"          = "⚠️  À RENOMMER en transmutation-data.js"
    "alchemy-manager.js"       = "⚠️  À RENOMMER en transmutation-manager.js"
    "alchemy.css"              = "⚠️  À RENOMMER en transmutation.css"
    "transmutation-data.js"    = "✅ Correct"
    "transmutation-manager.js" = "✅ Correct"
    "transmutation.css"        = "✅ Correct"
}

foreach ($file in $systemFiles.Keys) {
    $fullPaths = @(
        "src\config\$file",
        "src\js\$file",
        "src\css\$file"
    )
    
    $found = $false
    foreach ($path in $fullPaths) {
        if (Test-Path $path) {
            $found = $true
            $status = $systemFiles[$file]
            if ($status -like "*RENOMMER*") {
                Write-Host "  $status : $path" -ForegroundColor Yellow
            }
            else {
                Write-Host "  $status : $path" -ForegroundColor Green
            }
            break
        }
    }
}

Write-Host ""
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ VÉRIFICATION TERMINÉE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Actions recommandées :" -ForegroundColor Yellow
Write-Host "  1. Renommer fichiers alchemy → transmutation" -ForegroundColor White
Write-Host "  2. Corriger recettes cuir (wood_oak → fabric_simple_leather)" -ForegroundColor White
Write-Host "  3. Créer recettes utilisant ressources inutilisées" -ForegroundColor White
Write-Host ""
Write-Host "📄 Voir rapports détaillés :" -ForegroundColor Yellow
Write-Host "  - RAPPORT-ANALYSE-EQUILIBRAGE-CRAFTING.md" -ForegroundColor White
Write-Host "  - STATISTIQUES-CRAFTING-RESSOURCES.md" -ForegroundColor White
Write-Host ""
