import { jsx } from "preact/jsx-runtime"

const defaultOptions = {
  // [{ name: "Développement", slug: "developpement" }, ...]; slug "" is the home page.
  links: [],
}

/** Relative URL from `current` slug to `target`, like Quartz's resolveRelative. */
const relativeTo = (current, target) => {
  const depth = current.split("/").length - 1
  const root = depth === 0 ? "." : Array(depth).fill("..").join("/")
  return target ? `${root}/${target}` : root
}

const css = `.top-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1.25rem;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--lightgray);
}
.top-nav::-webkit-scrollbar {
  display: none;
}
.top-nav a {
  flex: none;
  color: var(--darkgray);
  background-color: transparent;
  font-size: 0.95rem;
  padding: 0;
  text-decoration: none;
}
.top-nav a:hover,
.top-nav a.active {
  color: var(--secondary);
}
.top-nav a.active {
  font-weight: 600;
}`

/** Horizontal navigation bar. The link whose slug prefixes the current page is highlighted. */
export const TopNav = (opts) => {
  const options = { ...defaultOptions, ...opts }

  const Component = ({ fileData, displayClass }) => {
    const slug = fileData.slug
    const isActive = (target) =>
      target === "" ? slug === "index" : slug === target || slug.startsWith(target + "/")

    return jsx("nav", {
      class: [displayClass, "top-nav"].filter(Boolean).join(" "),
      "aria-label": "navigation principale",
      children: options.links.map((link) => {
        const active = isActive(link.slug)
        return jsx("a", {
          href: relativeTo(slug, link.slug ? link.slug + "/" : ""),
          class: active ? "active" : undefined,
          "aria-current": active ? "page" : undefined,
          children: link.name,
        })
      }),
    })
  }

  Component.css = css
  return Component
}

export default TopNav
