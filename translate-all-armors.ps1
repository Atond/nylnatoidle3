# Script COMPLET pour traduire TOUTES les armures restantes

$file = "src/config/craft-recipes-armors.js"
$content = Get-Content $file -Raw -Encoding UTF8

Write-Host "`n🌍 TRADUCTION COMPLÈTE DES ARMURES...`n" -ForegroundColor Yellow

# ========== TANK HEAVY ARMOR ==========
# Iron
$content = $content -replace "name: 'Iron Legplates'", "name: 'Jambières de Fer'"
$content = $content -replace "name: 'Iron Gauntlets'", "name: 'Gantelets de Fer'"

# Steel
$content = $content -replace "name: 'Steel Legplates'", "name: 'Jambières d\'Acier'"
$content = $content -replace "name: 'Steel Gauntlets'", "name: 'Gantelets d\'Acier'"

# Mithril
$content = $content -replace "name: 'Mithril Legplates'", "name: 'Jambières de Mithril'"
$content = $content -replace "name: 'Mithril Gauntlets'", "name: 'Gantelets de Mithril'"

# Adamantite
$content = $content -replace "name: 'Adamantite Legplates'", "name: 'Jambières d\'Adamantite'"
$content = $content -replace "name: 'Adamantite Gauntlets'", "name: 'Gantelets d\'Adamantite'"

# ========== ARCHER LIGHT ARMOR ==========
# Leather
$content = $content -replace "name: 'Leather Vest'", "name: 'Gilet de Cuir'"
$content = $content -replace "name: 'Leather Gloves'", "name: 'Gants de Cuir'"

# Studded Leather
$content = $content -replace "name: 'Studded Leather Vest'", "name: 'Gilet de Cuir Clouté'"
$content = $content -replace "name: 'Studded Leather Gloves'", "name: 'Gants de Cuir Clouté'"

# Dragonscale
$content = $content -replace "name: 'Dragonscale Vest'", "name: 'Gilet d\'Écailles de Dragon'"
$content = $content -replace "name: 'Dragonscale Gloves'", "name: 'Gants d\'Écailles de Dragon'"

# Shadowsilk
$content = $content -replace "name: 'Shadowsilk Vest'", "name: 'Gilet de Soie d\'Ombre'"
$content = $content -replace "name: 'Shadowsilk Gloves'", "name: 'Gants de Soie d\'Ombre'"

# ========== MAGE CLOTH ARMOR ==========
# Enchanted
$content = $content -replace "name: 'Enchanted Pants'", "name: 'Pantalon Enchanté'"
$content = $content -replace "name: 'Enchanted Boots'", "name: 'Bottes Enchantées'"

# Archmage
$content = $content -replace "name: 'Archmage Pants'", "name: 'Pantalon d\'Archimage'"
$content = $content -replace "name: 'Archmage Boots'", "name: 'Bottes d\'Archimage'"
$content = $content -replace "name: 'Archmage Gloves'", "name: 'Gants d\'Archimage'"

# ========== HEALER CLOTH ARMOR ==========
# Basic Healer
$content = $content -replace "name: 'Basic Healer Hood'", "name: 'Capuche de Soigneur Basique'"
$content = $content -replace "name: 'Basic Healer Robe'", "name: 'Robe de Soigneur Basique'"
$content = $content -replace "name: 'Basic Healer Pants'", "name: 'Pantalon de Soigneur Basique'"
$content = $content -replace "name: 'Basic Healer Boots'", "name: 'Bottes de Soigneur Basique'"
$content = $content -replace "name: 'Basic Healer Gloves'", "name: 'Gants de Soigneur Basique'"

# Blessed
$content = $content -replace "name: 'Blessed Hood'", "name: 'Capuche Bénie'"
$content = $content -replace "name: 'Blessed Robe'", "name: 'Robe Bénie'"
$content = $content -replace "name: 'Blessed Pants'", "name: 'Pantalon Béni'"
$content = $content -replace "name: 'Blessed Boots'", "name: 'Bottes Bénies'"
$content = $content -replace "name: 'Blessed Gloves'", "name: 'Gants Bénis'"

# Divine Vestments
$content = $content -replace "name: 'Divine Vestments Hood'", "name: 'Capuche de Vêtements Divins'"
$content = $content -replace "name: 'Divine Vestments Robe'", "name: 'Robe de Vêtements Divins'"
$content = $content -replace "name: 'Divine Vestments Pants'", "name: 'Pantalon de Vêtements Divins'"
$content = $content -replace "name: 'Divine Vestments Boots'", "name: 'Bottes de Vêtements Divins'"
$content = $content -replace "name: 'Divine Vestments Gloves'", "name: 'Gants de Vêtements Divins'"

Set-Content $file -Value $content -Encoding UTF8 -NoNewline

Write-Host "  ✅ craft-recipes-armors.js" -ForegroundColor Green
Write-Host "     → 40+ traductions effectuées`n" -ForegroundColor White

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
Write-Host "✅ TRADUCTION TERMINÉE" -ForegroundColor Green
Write-Host "  • Toutes les armures Tank/Archer/Mage/Healer traduites" -ForegroundColor White
Write-Host "  • Fichier: craft-recipes-armors.js`n" -ForegroundColor White
