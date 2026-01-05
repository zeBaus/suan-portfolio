// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";

export const Work = defineDocumentType(() => ({
    name: "Work",
    filePathPattern: "work/**/*.mdx",
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true }, // ISO date (e.g., 2025-10-01)
        summary: { type: "string", required: true },
        tags: { type: "list", of: { type: "string" } },
        featured: { type: "boolean", default: false },
        cover: { type: "string", description: "Relative image path or remote URL" },
        order: { type: "string", description: "Optional sort override for listing (will be coerced)" }
    },
    computedFields: {
        slug: {
        type: "string",
        resolve: (doc) =>
            doc._raw.flattenedPath
            .replace(/^work\//, "")
            .replace(/\\/g, "/")
        },
        permalink: {
        type: "string",
        resolve: (doc) => `/work/${doc._raw.flattenedPath.replace(/^work\//, "")}`
        }
    }
}));

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Work],
    mdx: {
        remarkPlugins: [remarkGfm]
        // You can add rehype plugins later for heading anchors, code highlighting, etc.
    },
    disableImportAliasWarning: true
});
