export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function verdictColor(verdict: string): string {
  switch (verdict) {
    case "KÖP":
      return "bg-success text-white";
    case "SÄLJ":
      return "bg-danger text-white";
    default:
      return "bg-accent text-white";
  }
}
