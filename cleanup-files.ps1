# 🗑️ Script de Nettoyage - Nyln'ato Idle RPG
# Supprime les fichiers temporaires et doublons

Write-Host "🧹 Nettoyage des fichiers temporaires..." -ForegroundColor Cyan
Write-Host ""

# Fichiers temporaires à supprimer (SAFE)
$filesToDelete = @(
    "CORRECTION-HERBALIST-FISHER.md",
    "CORRECTIONS-BUGS-ALT-DONJONS.md",
    "FIX-AUTOGATHER-STATE.md",
    "TEST-EFFET-SURPRISE-ONGLETS.md",
    "GUIDE-TEST-RAPIDE-ALT-DONJONS.md",
    "GUIDE-TEST-EFFET-SURPRISE-TOUS-ONGLETS.md",
    "PHASE-1-EXTENDED-RECAP.md",
    "PHASE-2-COMPLETE-RECAP.md",
    "PHASE-2-PROGRESSION.md",
    "IMPLEMENTATION-ALT-DONJONS-RECAP.md",
    "IMPLEMENTATION-COMPLETE-ALT-DONJONS-UI.md",
    "NOUVELLES-PROFESSIONS-IMPLEMENTATION.md",
    "ANALYSE-STATS-EQUILIBRAGE.md",
    "ANALYSE-RECETTES-PLAN.md",
    "ANALYSE-COMPLETE-SOLUTIONS.md",
    "COMBAT-BALANCE-ANALYSIS.md",
    "RECAP-VISUEL.md",
    "RESUME-AUDIT.md"
)

$deletedCount = 0

foreach ($file in $filesToDelete) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "✅ Supprimé: $file" -ForegroundColor Green
        $deletedCount++
    }
    else {
        Write-Host "⚠️  Introuvable: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📦 Archivage des anciens rapports..." -ForegroundColor Cyan

# Garder AUDIT-COMPLET.md et ANALYSE-COMPLETE-RAPPORT.md
# Les renommer en *-OLD.md pour historique
$auditPath = Join-Path $PSScriptRoot "AUDIT-COMPLET.md"
if (Test-Path $auditPath) {
    $newPath = Join-Path $PSScriptRoot "AUDIT-COMPLET-OLD.md"
    if (Test-Path $newPath) {
        Remove-Item $newPath -Force
    }
    Rename-Item $auditPath "AUDIT-COMPLET-OLD.md"
    Write-Host "📦 Archivé: AUDIT-COMPLET.md → AUDIT-COMPLET-OLD.md" -ForegroundColor Yellow
}

$analysePath = Join-Path $PSScriptRoot "ANALYSE-COMPLETE-RAPPORT.md"
if (Test-Path $analysePath) {
    $newPath = Join-Path $PSScriptRoot "ANALYSE-COMPLETE-RAPPORT-OLD.md"
    if (Test-Path $newPath) {
        Remove-Item $newPath -Force
    }
    Rename-Item $analysePath "ANALYSE-COMPLETE-RAPPORT-OLD.md"
    Write-Host "📦 Archivé: ANALYSE-COMPLETE-RAPPORT.md → ANALYSE-COMPLETE-RAPPORT-OLD.md" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📊 RÉSUMÉ" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "Fichiers supprimés  : $deletedCount" -ForegroundColor Green
Write-Host "Fichiers archivés   : 2" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Nettoyage terminé !" -ForegroundColor Green
Write-Host "📄 Nouveau rapport : RAPPORT-ANALYSE-FINALE.md" -ForegroundColor Cyan
