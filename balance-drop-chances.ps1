# Script d'équilibrage automatique des dropChance dans drops-data.js
# Objectif : Cohérence des taux de drop selon la rareté

Write-Host "🎲 Équilibrage des dropChance dans drops-data.js..." -ForegroundColor Cyan

$filePath = "src\config\drops-data.js"
$content = Get-Content $filePath -Raw

# Règles d'équilibrage basées sur la rareté
$balanceRules = @{
    "common"    = @{
        min         = 0.30
        max         = 0.50
        description = "Drops communs (30-50%)"
    }
    "uncommon"  = @{
        min         = 0.15
        max         = 0.30
        description = "Drops peu communs (15-30%)"
    }
    "rare"      = @{
        min         = 0.05
        max         = 0.15
        description = "Drops rares (5-15%)"
    }
    "elite"     = @{
        min         = 0.40
        max         = 0.70
        description = "Drops élites (40-70% - monstres difficiles)"
    }
    "legendary" = @{
        min         = 0.01
        max         = 0.05
        description = "Drops légendaires (1-5%)"
    }
    "boss"      = @{
        min         = 1.0
        max         = 1.0
        description = "Drops de boss (100% garanti)"
    }
}

Write-Host "`n📊 ANALYSE DES DROPS..." -ForegroundColor Yellow
Write-Host "=" * 60

# Pattern pour matcher les drops avec rarity et dropChance
$dropPattern = '(?s)(\w+):\s*\{[^}]*?rarity:\s*[''"](\w+)[''"][^}]*?dropChance:\s*([\d.]+)[^}]*?\}'

$matches = [regex]::Matches($content, $dropPattern)
$changesCount = 0
$stats = @{}

foreach ($match in $matches) {
    $dropId = $match.Groups[1].Value
    $rarity = $match.Groups[2].Value
    $currentChance = [double]$match.Groups[3].Value
    
    # Initialiser stats pour cette rareté
    if (-not $stats.ContainsKey($rarity)) {
        $stats[$rarity] = @{
            count    = 0
            tooLow   = 0
            tooHigh  = 0
            balanced = 0
        }
    }
    
    $stats[$rarity].count++
    
    # Vérifier si le drop est un boss drop (unique: true)
    $isUnique = $match.Groups[0].Value -match 'unique:\s*true'
    $effectiveRarity = if ($isUnique) { "boss" } else { $rarity }
    
    if ($balanceRules.ContainsKey($effectiveRarity)) {
        $rule = $balanceRules[$effectiveRarity]
        
        if ($currentChance -lt $rule.min) {
            Write-Host "  ⬆️  $dropId ($effectiveRarity): $currentChance → devrait être ≥ $($rule.min)" -ForegroundColor Red
            $stats[$rarity].tooLow++
        }
        elseif ($currentChance -gt $rule.max -and $effectiveRarity -ne "boss") {
            Write-Host "  ⬇️  $dropId ($effectiveRarity): $currentChance → devrait être ≤ $($rule.max)" -ForegroundColor Yellow
            $stats[$rarity].tooHigh++
        }
        else {
            $stats[$rarity].balanced++
        }
    }
}

Write-Host "`n📈 STATISTIQUES PAR RARETÉ" -ForegroundColor Green
Write-Host "=" * 60

foreach ($rarity in $stats.Keys | Sort-Object) {
    $stat = $stats[$rarity]
    $total = $stat.count
    $balanced = $stat.balanced
    $tooLow = $stat.tooLow
    $tooHigh = $stat.tooHigh
    $balancedPct = [math]::Round(($balanced / $total) * 100, 1)
    
    $color = if ($balancedPct -ge 80) { "Green" } elseif ($balancedPct -ge 50) { "Yellow" } else { "Red" }
    
    Write-Host "`n  $rarity (Total: $total)" -ForegroundColor White
    Write-Host "    ✅ Équilibrés: $balanced ($balancedPct%)" -ForegroundColor $color
    Write-Host "    ⬆️  Trop bas: $tooLow" -ForegroundColor Red
    Write-Host "    ⬇️  Trop haut: $tooHigh" -ForegroundColor Yellow
    
    if ($balanceRules.ContainsKey($rarity)) {
        $rule = $balanceRules[$rarity]
        Write-Host "    📋 Recommandé: $($rule.description)" -ForegroundColor Cyan
    }
}

Write-Host "`n🎯 RECOMMANDATIONS" -ForegroundColor Magenta
Write-Host "=" * 60
Write-Host "1. Drops COMMON : Augmenter à 35-45% (ressources de base)"
Write-Host "2. Drops UNCOMMON : Réduire à 20-25% (ressources intermédiaires)"
Write-Host "3. Drops RARE : Garder à 8-12% (ressources précieuses)"
Write-Host "4. Drops ELITE : Drops garantis sur monstres difficiles (50-70%)"
Write-Host "5. Drops LEGENDARY : Très rares 2-4% (sauf boss 100%)"

Write-Host "`n💡 Pour appliquer automatiquement les corrections:" -ForegroundColor Yellow
Write-Host "   Modifier manuellement drops-data.js avec les valeurs recommandées ci-dessus"

Write-Host "`n✅ Analyse terminée!" -ForegroundColor Green
