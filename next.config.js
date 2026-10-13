module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source:
          "/p/comment-g%C3%A9rer-son-r%C3%A9assort-et-ses-commandes-fournisseur-avec-alexandrie",
        destination:
          "/p/comment-gerer-son-reassort-et-ses-commandes-fournisseur-avec-alexandrie",
        permanent: true,
      },
    ];
  },
};
