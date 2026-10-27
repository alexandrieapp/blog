# Blog Alexandrie

Code source de [blog.alexandrie.app](https://blog.alexandrie.app) : une application [Next.js](https://nextjs.org/) dont les articles sont des fichiers Markdown versionnés dans ce dépôt. Publier ou modifier un article se fait par un commit sur `main`, qui déclenche un nouveau déploiement sur Railway.

## Développement

```sh
yarn install
yarn dev        # http://localhost:3002
```

## Écrire un article

Chaque article est un dossier dans `content/posts/`. Le nom du dossier est le slug de l'URL (`/p/<dossier>`), en minuscules et sans accents.

```
content/posts/mon-article/
  index.md        ← frontmatter + contenu
  cover.png       ← images, vidéos, fichiers à télécharger
```

### Frontmatter

```yaml
---
title: Gérer les ruptures de stock en librairie
seoTitle: Ruptures de stock en librairie  # facultatif, balise <title> et Open Graph si différent du titre affiché
date: 2025-03-12
updated: 2025-06-01         # facultatif, date de la dernière mise à jour
description: Texte d'aperçu affiché dans les listes et les métadonnées.
category: Guide             # Guide | Article
author: jo                  # clé de content/authors.yml
status: published           # draft | unlisted | published
featured: false             # mis en avant en haut de la page d'accueil
featuredImage: ./cover.png  # image de mise en avant (articles featured)
slug: autre-slug            # facultatif, remplace le nom du dossier
---
```

| `status`    | Page générée en production | Listes, RSS, sitemap |
| ----------- | -------------------------- | -------------------- |
| `draft`     | non (visible en `yarn dev`, avec un bandeau) | non |
| `unlisted`  | oui, en `noindex`          | non                  |
| `published` | oui                        | oui                  |

`title`, `date`, `description` et `status` sont obligatoires : le build échoue si l'un d'eux manque.

### Contenu

Markdown standard avec les extensions GitHub (tableaux, barré, liens automatiques). Les fichiers placés dans le dossier de l'article se référencent en relatif :

```md
![Légende affichée sous l'image](./capture.png)

[Télécharger le fichier d'exemple](./exemple.csv)

> 💡 Une remarque mise en évidence.
```

Deux directives couvrent les vidéos :

```md
::video{src="./demo.mp4" caption="Légende facultative"}

::youtube{id="dQw4w9WgXcQ"}
```

Dans un tableau, la ligne d'en-tête et la première colonne servent d'intitulés et s'affichent en gras. Pour mettre une colonne en valeur, entourer le tableau de la directive `table` en nommant l'en-tête de la colonne :

```md
:::table{highlight="Alexandrie"}
|  | Alexandrie | Concurrent |
| --- | --- | --- |
| Accès | Navigateur | Windows |
:::
```

Une directive inconnue, ou une colonne `highlight` introuvable, fait échouer le build.

### Vidéos

Les vidéos sont committées avec l'article, encodées en H.264 pour rester légères :

```sh
ffmpeg -i source.mov -c:v libx264 -crf 28 -vf "scale='min(1280,iw)':-2" -r 30 \
  -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart demo.mp4
```

Si `ffmpeg` n'inclut pas `libx264` (build Homebrew minimal sur macOS), remplacer `-c:v libx264 -crf 28` par `-c:v h264_videotoolbox -b:v 700k`.

Au-delà de 20 Mo après compression, la vidéo est publiée sur YouTube et intégrée avec `::youtube`.

### Auteurs

`content/authors.yml` associe une clé à un nom et à un avatar placé dans `content/authors/` :

```yaml
jo:
  name: Jo
  avatar: ./authors/jo.jpg
```

## Fonctionnement

- `lib/posts.ts` lit et valide les articles ; `lib/markdown.ts` les convertit en arbre HTML (unified : remark-gfm, remark-directive) ; `components/PostContent.tsx` le rend avec les composants du blog.
- Toutes les pages sont générées au build.
- `scripts/copy-content-assets.js` copie les fichiers des articles et des auteurs dans `public/posts/` et `public/authors/` avant `dev` et `build`. Ces copies ne sont pas versionnées.
