import "./src/env.js";

/** @type {import("next").NextConfig} */
const coreConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["ys97tle9ee.ufs.sh"],
  },
};

import { withSentryConfig } from "@sentry/nextjs";

const sentryWebpackOptions = {
  org: "gamer-inc",
  project: "t3gallery_hss",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const config = withSentryConfig(coreConfig, sentryWebpackOptions);

export default config;