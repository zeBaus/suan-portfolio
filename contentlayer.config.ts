// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";

export const Work = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: "work/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },

    // Optional: keep supported for those who want it, but never required.
    // This avoids implying gaps and lets you remove dates entirely from MDX.
    date: { type: "date", required: false },

    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    featured: { type: "boolean", default: false },
    cover: { type: "string", description: "Relative image path or remote URL" },

    // Keep order as string for backward compat (you already coerce to number in UI)
    order: { type: "string", description: "Optional sort override for listing (will be coerced)" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.replace(/^work\//, "").replace(/\\/g, "/"),
    },
    permalink: {
      type: "string",
      resolve: (doc) => `/work/${doc._raw.flattenedPath.replace(/^work\//, "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Work],
  mdx: {
    remarkPlugins: [remarkGfm],
    // You can add rehype plugins later for heading anchors, code highlighting, etc.
  },
  disableImportAliasWarning: true,
});
