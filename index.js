// Upsert
// Then write vectors into a namespace in your index. You use namespaces to help speed up queries and comply with multi-tenancy requirements.
await index.namespace("ns1").upsert([
  {
    id: "vec1",
    values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    metadata: { genre: "drama" },
  },
  {
    id: "vec2",
    values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
    metadata: { genre: "action" },
  },
  {
    id: "vec3",
    values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    metadata: { genre: "drama" },
  },
  {
    id: "vec4",
    values: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
    metadata: { genre: "action" },
  },
]);

// Query
// Search the "ns1" namespace in your index for the 2 vectors that are most similar to an example vector, filtering for results that match a specific metadata value:
await index.namespace("ns1").query({
  topK: 2,
  vector: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
  includeValues: true,
  includeMetadata: true,
  filter: { genre: { $eq: "action" } },
});
