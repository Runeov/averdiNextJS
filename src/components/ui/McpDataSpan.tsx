import { cn } from "@/lib/utils";

interface McpDataSpanProps {
  /** Unik ID som matcher nøkkelen MCP-serveren ser etter (f.eks. "aga-sone1-sats") */
  id: string;
  /** Verdien som skal vises (f.eks. 0.141 eller 850000) */
  value: number | string;
  /** Hvordan skal det vises for mennesker? */
  format?: 'percentage' | 'currency' | 'text';
  /** Kilden vi påstår dette kommer fra (for validering) */
  source?: string;
  className?: string;
  /** ISO date (YYYY-MM-DD). Når oppgitt, vises rød tekst + "utløpt" hvis fristen er passert. */
  deadline?: string;
}

export function McpDataSpan({
  id,
  value,
  format = 'text',
  source = "Averdi Internal DB",
  className,
  deadline,
}: McpDataSpanProps) {

  // Formater visningen for mennesker
  let displayValue = value.toString();

  if (typeof value === 'number') {
    if (format === 'percentage') {
      displayValue = `${(value * 100).toFixed(1).replace('.', ',')}%`;
    } else if (format === 'currency') {
      displayValue = new Intl.NumberFormat('no-NO', {
        style: 'currency',
        currency: 'NOK',
        maximumFractionDigits: 0
      }).format(value);
    }
  }

  // Deadline check — evaluates at build/deploy time (server component)
  let isExpired = false;
  let isExpiringSoon = false;

  if (deadline) {
    const deadlineDate = new Date(deadline + 'T23:59:59');
    const now = new Date();
    const msUntil = deadlineDate.getTime() - now.getTime();
    const daysUntil = msUntil / (1000 * 60 * 60 * 24);

    if (daysUntil < 0) {
      isExpired = true;
    } else if (daysUntil <= 7) {
      isExpiringSoon = true;
    }
  }

  return (
    <span
      id={`mcp-target-${id}`}
      data-mcp-value={value}
      data-mcp-source={source}
      data-mcp-last-verified={new Date().toISOString().split('T')[0]}
      {...(isExpired && { 'data-mcp-expired': 'true' })}
      {...(isExpiringSoon && { 'data-mcp-expiring-soon': 'true' })}
      className={cn(
        "font-semibold text-slate-900",
        isExpired && "text-red-600 line-through",
        isExpiringSoon && "text-amber-600",
        className
      )}
    >
      {displayValue}
      {isExpired && (
        <span className="ml-1.5 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 no-underline">
          utløpt
        </span>
      )}
      {isExpiringSoon && (
        <span className="ml-1.5 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
          snart
        </span>
      )}
    </span>
  );
}
