import React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const PREFIX = "/dashboard_BL0626";

function withPrefix(path: string): string {
  if (!path) return PREFIX;
  if (path.startsWith(PREFIX)) return path;
  if (path === "/") return PREFIX;
  if (path.startsWith("/")) return `${PREFIX}${path}`;
  return path;
}

type LinkProps = {
  to?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
};

/**
 * Wouter-compatible Link that:
 * - accepts either `to` or `href`
 * - prefixes paths with the dashboard base route
 * - passes through children (wouter pattern often wraps a span/anchor)
 */
export function Link({ to, href, children, ...rest }: LinkProps) {
  const target = withPrefix(to ?? href ?? "/");
  return (
    <RouterLink to={target} {...rest}>
      {children}
    </RouterLink>
  );
}

export function useLocationShim(): [string, (to: string) => void] {
  const loc = useLocation();
  const navigate = useNavigate();
  return [loc.pathname, (to: string) => navigate(withPrefix(to))];
}

export { useLocationShim as useLocation };