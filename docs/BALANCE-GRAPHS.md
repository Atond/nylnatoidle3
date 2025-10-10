# 📊 GRAPHIQUES PROGRESSION - IDLE RPG V2

> Visualisation des courbes de progression pour comprendre la vision du jeu

---

## 📈 NIVEAU PERSONNAGE (LINÉAIRE)

### **Courbe XP**

```
XP Requis
625,000 |                                         ████
500,000 |                                    ████
400,000 |                               ████
300,000 |                          ████
200,000 |                     ████
100,000 |               ████
 50,000 |         ████
 10,000 |    ████
      0 |████
        └────────────────────────────────────────→ Niveau
         1   5  10  15  20  25  30  35  40  45  50
```

**Observation** : Croissance **quadratique modérée** (base × niveau²)  
→ Niveau 50 atteignable en 50-75 heures  
→ **CAP permanent** à 50

---

## 🌲 MÉTIERS (EXPONENTIEL)

### **Courbe XP**

```
XP Requis
1e27 |                                              █
1e24 |                                           █
1e21 |                                        █
1e18 |                                     █
1e15 |                                  █
1e12 |                               █
1e9  |                            █
1e6  |                         █
1e3  |                      █
100  |                   █
  10 |                █
   1 |█
     └───────────────────────────────────────────→ Niveau
      1  5 10 20 30 40 50 60 70 80 90 100 150 200
```

**Observation** : Croissance **exponentielle** (base × 1.5^niveau)  
→ Niveau 20 = 332K XP  
→ Niveau 50 = 63.7 MILLIARDS XP  
→ Niveau 100 = 4.38e27 XP  
→ **PAS de cap** (infini)

---

## 🏙️ VILLE - PRODUCTION

### **Courbe Production (Ressources/min)**

```
Ressources/min
10,000,000,000 |                                         █
 1,000,000,000 |                                    █
   100,000,000 |                               █
    10,000,000 |                          █
     1,000,000 |                     █
       100,000 |                █
        10,000 |           █
         1,000 |      █
           100 |   █
            10 |█
             1 |
               └────────────────────────────────────────→ Niveau Ville
                1   5  10  15  20  25  30  35  40  45  50
```

**Observation** : Croissance **exponentielle** (base × 1.5^niveau)  
→ Niveau 10 = 575/min  
→ Niveau 20 = 43,000/min  
→ Niveau 30 = 3,300,000/min  
→ Niveau 50 = 1,800,000,000/min (1.8 MILLIARDS)

---

## 💰 VILLE - COÛT UPGRADES

### **Courbe Coût (Gold)**

```
Gold
1,000,000,000,000 |                                     █
  100,000,000,000 |                                 █
   10,000,000,000 |                             █
    1,000,000,000 |                         █
      100,000,000 |                     █
       10,000,000 |                 █
        1,000,000 |             █
          100,000 |         █
           10,000 |     █
            1,000 |  █
              100 |█
               10 |
                  └────────────────────────────────────────→ Niveau Ville
                   1   5  10  15  20  25  30  35  40  45  50
```

**Observation** : Croissance **exponentielle** (base × 3^niveau)  
→ Niveau 10 = 590K gold  
→ Niveau 20 = 3.5 MILLIARDS gold  
→ Niveau 30 = 205 TRILLIONS gold  
→ **Coûts astronomiques** pour équilibrer production

---

## 👥 MULTI-PERSONNAGES

### **Timeline Déblocages**

```
Personnages
40 |                                                         █
35 |                                                    █
30 |                                               █
25 |                                          █
20 |                                     █ ← RAIDS DÉBLOQUÉS
15 |                                █
10 |                           █ ← Bonus +25% XP
 5 |                      █ ← Bonus +10% XP
 3 |                 █ ← DONJONS DÉBLOQUÉS
 2 |            █ ← 2e perso (×2 speed leveling)
 1 |       █ ← Premier perso (histoire)
 0 |
   └─────────────────────────────────────────────────────→ Temps
    0   15  30  45  60  90  120 150 180 210 240 270 300 jours
```

**Observation** :

- 1er perso : 30 jours (découverte)
- 2e perso : 15 jours (×2 speed)
- 3e perso : 10 jours (×3 speed + ville)
- Donjons débloqués jour 45
- Raids débloqués jour 180-300

---

## 📊 COMPARAISON V1 vs V2

### **Niveau Personnage**

```
Niveau
∞  |                  V1 (infini, exponentiel)
   |                    █
100|                   █
   |                  █
50 |                █ ← V2 (CAP, linéaire)
   |               █
25 |             █
   |           █
10 |        █
   |      █
1  |  ████
   └───────────────────────────────────────→ Temps
    0h  10h  25h  50h  100h  200h  500h  ∞
```

### **Métiers**

```
Niveau
∞  |                              V2 (infini, exponentiel)
   |                                  █
200|                                 █
   |                                █
100|                               █
   |                              █
50 |  V1 (cap 50)                █
   |  █████████████████████████ █
25 |                          █
   |                         █
10 |                       █
   |                      █
1  |                    █
   └───────────────────────────────────────→ Temps
    0   1m  3m  6m  1y  2y  3y  5y  10y  ∞
```

**Changements clés** :

- ✅ V1 : Niveau perso infini (pas intéressant)
- ✅ V2 : Niveau perso cap 50 (focus histoire)
- ✅ V1 : Métiers cap 50 (frustrant)
- ✅ V2 : Métiers infini (satisfaisant)

---

## 🎮 SATISFACTION JOUEUR

### **Courbe "Fun Factor"**

```
Fun
10 |                      ████████████████  ← V2 (endgame riche)
 9 |                  ████
 8 |              ████
 7 |          ████
 6 |      ████
 5 |  ████
 4 |█                 ████                  ← V1 (plateau)
 3 |                     ████
 2 |                         ████
 1 |                             ████
 0 └────────────────────────────────────────→ Temps
    0   10h  25h  50h  100h  200h  500h  1000h

   Early  Mid   Late  Endgame  Infinite
```

**Observation** :

- V1 : Pic à 50h, puis plateau (boring)
- V2 : Croissance continue grâce à :
  - Métiers exponentiels (gros chiffres)
  - Multi-persos (variété)
  - Donjons/Raids (challenge)
  - Contenu infini (toujours nouveau)

---

## 💎 RICHESSE JOUEUR (Gold)

### **Courbe Accumulation**

```
Gold Total
1,000,000,000,000 |                                    █
  100,000,000,000 |                               █
   10,000,000,000 |                          █
    1,000,000,000 |                     █
      100,000,000 |                █
       10,000,000 |           █
        1,000,000 |      █
          100,000 | █
           10,000 |█
            1,000 |
              100 |
               10 |
                  └────────────────────────────────────────→ Temps
                   1d  3d  1w  2w  1m  3m  6m  1y  2y  5y  ∞
```

**Milestones** :

- 100K gold (jour 3) : Craft premier rare
- 1M gold (semaine 1) : Débloquer 2e perso
- 100M gold (mois 2) : Ville niveau 30
- 1B gold (mois 6) : Débloquer raids
- 1T gold (an 2+) : Craft équipement divin

---

## 🏆 ENDGAME CONTENT

### **Déblocages Progressifs**

```
Contenu
Mythique+    |                                            █
Raids        |                                  ██████████
Donjons      |                      ████████████
Équip Mythic |            ██████████████████████████████
Équip Legend |    ████████████████████████
Équip Epic   |████████████████
Équip Rare   |██████████
Équip Uncommon|████
             └────────────────────────────────────────→ Personnages
              1  2  3  5  10  15  20  25  30  35  40
```

**Observation** :

- Contenu débloqué progressivement
- Toujours quelque chose de nouveau
- Pas de "fin" du jeu
- Scaling infini (Mythique+)

---

## 📉 TEMPS PAR ACTIVITÉ

### **Répartition Temps Joueur**

```
% Temps
100%|
    |████████████████ (40%)  ← Combat/Leveling
 75%|
    |████████ (20%)          ← Métiers
 50%|
    |████████ (20%)          ← Craft/Équipement
 25%|
    |████ (10%)              ← Ville/Upgrades
    |██ (5%)                 ← Donjons
  0%|█ (5%)                  ← Raids
    └────────────────────────────────────────→
     Early  Mid   Late  Endgame
```

**Évolution** :

- **Early** (1-50h) : 80% combat, 20% métiers
- **Mid** (50-200h) : 50% métiers, 30% craft, 20% combat
- **Late** (200-500h) : 40% ville, 30% craft, 30% donjons
- **Endgame** (500h+) : 50% raids, 30% métiers, 20% optimisation

---

## 🎯 RETENTION JOUEUR

### **Taux Rétention Estimé**

```
% Joueurs Actifs
100%|████
 90%|███ ← Jour 1
 80%|██
 70%|██  ← Jour 7
 60%|█
 50%|█   ← Jour 30 (premier perso max)
 40%|█
 30%|█   ← Mois 3 (donjons débloqués)
 20%|
 10%|    ← An 1+ (hardcore players)
  0%└────────────────────────────────────────→ Temps
     1d  3d  1w  2w  1m  2m  3m  6m  1y  2y  ∞
```

**Facteurs Rétention** :

- ✅ Progression satisfaisante (gros chiffres)
- ✅ Contenu régulier (donjons, raids, nouveaux tiers)
- ✅ Pas de "mur" frustrant
- ✅ Toujours un objectif (perso suivant, donjon, raid)
- ✅ Idle = progress AFK (pas de FOMO)

---

## 🌟 POWER LEVEL

### **Puissance Relative Personnages**

```
Power Level
1,000,000 |                                            █ (40 persos, raid gear)
  100,000 |                                     ████
   10,000 |                               ████
    1,000 |                         ████ (5 persos, donjon gear)
      100 |                   ████
       10 |             ████ (1 perso level 50)
        1 |       ████ (1 perso level 1)
          └────────────────────────────────────────→ Temps
           0   30d  60d  90d  120d 180d 270d 360d  ∞
```

**Observation** :

- Power scaling **exponentiel**
- Jamais de "plateau" (toujours plus fort)
- Multi-persos = multiplicateur puissance
- Équipement > Stats (endgame)

---

## 💡 CONCLUSION GRAPHIQUES

### **Résumé Courbes Clés**

| Élément               | Type Courbe | Cap | Sensation          |
| --------------------- | ----------- | --- | ------------------ |
| **Niveau Personnage** | Quadratique | 50  | Histoire/Narratif  |
| **Métiers**           | Exponentiel | ∞   | Millions/Milliards |
| **Ville Production**  | Exponentiel | ∞   | Production Massive |
| **Coûts Upgrades**    | Exponentiel | ∞   | Balance production |
| **Multi-Persos**      | Linéaire    | ∞   | Variété/Stratégie  |
| **Power Level**       | Exponentiel | ∞   | Toujours plus fort |

**La magie** : Combiner **narratif linéaire** (niveau) avec **progression infinie** (métiers/ville) !

---

**Date** : 9 Octobre 2025  
**Auteur** : Visualisation de la vision V2  
**Statut** : ✅ Documentation complète
