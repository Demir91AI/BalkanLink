import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execFileSync } from "child_process";
import { buildVersionPayload, resolveCommitSha } from "./scripts/build-provenance";

// Emits /version.json at build time so the running app can detect new deploys
// without waiting for the service-worker lifecycle.
function versionJsonPlugin(): Plugin {
  const version = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: "balkanlink-version-json",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "version.json",
        source: JSON.stringify(
          buildVersionPayload(
            version,
            new Date().toISOString(),
            resolveCommitSha(process.env, () => {
              const opts = { encoding: "utf8" as const, stdio: ["ignore", "pipe", "ignore"] as ["ignore", "pipe", "ignore"] };
              const head = execFileSync("git", ["rev-parse", "HEAD"], opts);
              const dirty = execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], opts).trim() !== "";
              return { head, dirty };
            }),
          ),
        ),
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), mode !== "development" && versionJsonPlugin()].filter(Boolean) as Plugin[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-charts': ['recharts'],
          'vendor-pdf': ['react-pdf'],
        },
      },
    },
  },
}));
