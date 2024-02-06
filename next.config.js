module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "res.cloudinary.com",

      // Image from github pages
      "alexandrieapp.github.io",

      // Images from Notion
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
}
