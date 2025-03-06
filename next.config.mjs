/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // افزودن rule برای فایل‌های ویدیویی
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // شناسایی فایل‌های ویدیویی و صوتی
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/media/", // مسیر عمومی برای فایل‌ها
            outputPath: `${isServer ? "../" : ""}static/media/`, // مسیر خروجی برای فایل‌ها
            name: "[name].[hash].[ext]", // نام فایل خروجی
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: ["urtlylafjtzglcagreej.supabase.co"], // افزودن 'localhost' به لیست مجاز hostname‌ها
  },
};

export default nextConfig;
