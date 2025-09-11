export async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (res.status === 401) throw new Error("unauthorized");
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return await res.json();
  return res;
}
