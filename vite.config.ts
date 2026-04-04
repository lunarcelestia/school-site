import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mergeContentToDistPlugin() {
  return {
    name: "merge-content-to-dist",
    closeBundle() {
      const defaultsPath = path.join(__dirname, "src/data/content.defaults.json");
      const cmsPath = path.join(__dirname, "data/content.json");
      const defaults = JSON.parse(fs.readFileSync(defaultsPath, "utf8")) as Record<string, unknown>;
      const cms = JSON.parse(fs.readFileSync(cmsPath, "utf8")) as Record<string, unknown>;
      const merged = {
        ...defaults,
        cards: cms.cards ?? defaults.cards,
        contacts: cms.contacts ?? defaults.contacts,
        text_blocks: cms.text_blocks ?? defaults.text_blocks,
        project_practices: cms.project_practices ?? defaults.project_practices,
        community_groups: cms.communities ?? defaults.community_groups,
        journal_companies: cms.journal_companies ?? defaults.journal_companies,
        journal_interviews: cms.journal_interviews ?? defaults.journal_interviews,
        event_modal_items: cms.events ?? defaults.event_modal_items,
        office_features: cms.office_features ?? defaults.office_features,
      };
      const outDir = path.join(__dirname, "dist/data");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, "content.json"),
        JSON.stringify(merged, null, 2),
        "utf8"
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), mergeContentToDistPlugin()],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      /** Один файл с Decap: корень репозитория data/content.json */
      "@cms/content.json": path.resolve(__dirname, "data/content.json"),
    },
  },
});
