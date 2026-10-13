---
title: Importer des livres en masse via un fichier CSV
date: '2025-06-06'
description: Importer des livres en masse dans Alexandrie, via un fichier CSV.
category: Guide
author: jo
status: published
featured: true
featuredImage: ./cover.png
---

Alexandrie offre la possibilité d’importer massivement des produits à partir d’un fichier CSV. Selon l’option choisie, le produit peut être enrichi avec les métadonnées du Fichier Exhaustif du Livre (FEL). L’import permet de modifier tous les attributs d’un produit. Le résultat de l’import est visible dans la section *Paramètre > Tâches.*

## Structure du fichier 

[Exemple de fichier CSV valide](./import-produits-exemple.csv)

> ⚠️ Seule la colonne EAN est obligatoire ! Des produits sans prix ne seront pas synchronisés avec les partenaires tiers comme le Pass Culture ou Place des libraires.

## Options

Des options permettent de moduler la façon d’importer un produit. 

| Nom de l’option | Description |
| --- | --- |
| Ignorer la ligne si le produit est déjà dans le catalogue | Le produit ne sera pas modifié (ni par le FEL, ni par les informations contenues dans le CSV). |
| Importer d’abord depuis le FEL | Le produit sera d’abord créé à partir du FEL. Les informations contenues dans le CSV viendront écraser les informations du FEL. Si vous ne voulez pas écraser les informations du FEL, laissez la colonne vide. |
| Ignorer la ligne si la notice n’existe pas dans le FEL | Le produit ne sera pas créé si aucune notice n’est trouvée dans le FEL à partir de son EAN. Et la ligne sera considérée comme étant en erreur. |

## Import des catégories 

On peut importer les catégories de deux manières: 

- A partir de l’ID de la catégorie Alexandrie ⇒ colonne `id categories`
- A partir du nom de la catégorie Alexandrie ⇒ colonne `nom categories`

> ⚠️ Le nom de la catégorie sera normalisé par Alexandrie. Si `dépot` est entré, la catégorie associée sera `DEPOT`. 

## Import des fournisseur & Éditeurs

On peut importer le fournisseur de deux manières: 

- A partir du nom du fournisseur ⇒ colonne `nom fournisseur`
- A partir du GLN du fournisseur ⇒ colonne `gln fournisseur`

> ⚠️ Le nom du fournisseur sera normalisé par Alexandrie. `Hachette Livre` devient `HACHETTE LIVRE`.

On peut importer l’éditeur de deux manières: 

- A partir du nom de l’éditeur ⇒ colonne `nom editeur`
- A partir du GLN de l’éditeur ⇒ colonne `gln editeur`

> ⚠️ Le nom de l’éditeur sera normalisé par Alexandrie. `Calmann-Levy` devient `CALMANN-LEVY`.

Champs verrouillés
