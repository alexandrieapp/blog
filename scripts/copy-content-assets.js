// Copie les fichiers servis publiquement depuis content/ vers public/ :
//   content/posts/<dossier>/<fichier>  ->  public/posts/<dossier>/<fichier>
//   content/authors/<fichier>          ->  public/authors/<fichier>
// content/ reste la seule source versionnée ; public/posts et public/authors
// sont régénérés à chaque `yarn dev` / `yarn build`.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const content = path.join(root, "content");
const publicDir = path.join(root, "public");

const copyDir = (from, to, skip = () => false) => {
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.isDirectory() || skip(entry.name)) continue;
    fs.copyFileSync(path.join(from, entry.name), path.join(to, entry.name));
  }
};

const postsDir = path.join(content, "posts");
fs.rmSync(path.join(publicDir, "posts"), { recursive: true, force: true });
for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  copyDir(
    path.join(postsDir, entry.name),
    path.join(publicDir, "posts", entry.name),
    (name) => name.endsWith(".md")
  );
}

copyDir(path.join(content, "authors"), path.join(publicDir, "authors"));
