/**
 * Helper function to determine whether a navigation link is active based on the current pathname.
 * Handles exact matches, subpaths (e.g. /works/project-name -> /works), and route variations
 * such as singular/plural collections (/blog/[slug] matching /blogs).
 */
export function isLinkActive(currentPath: string, targetHref: string): boolean {
  if (!currentPath || !targetHref) return false;

  // Strip query parameters and hashes, normalize trailing slashes
  const cleanCurrent = currentPath.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const cleanTarget = targetHref.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

  // Root / Home page ("about")
  if (cleanTarget === "/") {
    return cleanCurrent === "/" || cleanCurrent === "/about" || cleanCurrent.startsWith("/about/");
  }

  // Exact match (e.g. /works === /works)
  if (cleanCurrent === cleanTarget) {
    return true;
  }

  // Subpath match with directory boundary (e.g. /works/project-name matches /works)
  if (cleanCurrent.startsWith(`${cleanTarget}/`)) {
    return true;
  }

  // Plural/singular matching for blog posts:
  // Detail posts live under `/blog/[...slug]`, whereas list page is `/blogs`
  if (cleanTarget === "/blogs" || cleanTarget === "/blog") {
    return (
      cleanCurrent === "/blogs" ||
      cleanCurrent === "/blog" ||
      cleanCurrent.startsWith("/blogs/") ||
      cleanCurrent.startsWith("/blog/")
    );
  }

  // Plural/singular matching for services if needed
  if (cleanTarget === "/services" || cleanTarget === "/service") {
    return (
      cleanCurrent === "/services" ||
      cleanCurrent === "/service" ||
      cleanCurrent.startsWith("/services/") ||
      cleanCurrent.startsWith("/service/")
    );
  }

  return false;
}
