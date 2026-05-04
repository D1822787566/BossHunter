import { useId } from 'react'
import { cn } from '@/lib/utils'

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  value: string[]
  options: MultiSelectOption[]
  placeholder: string
  onChange: (value: string[]) => void
  className?: string
  compact?: boolean
}

export function MultiSelect({ value, options, placeholder, onChange, className, compact = false }: MultiSelectProps) {
  const labelId = useId()
  const selectedLabels = options.filter(option => value.includes(option.value)).map(option => option.label)
  const summary = selectedLabels.length === 0
    ? placeholder
    : selectedLabels.length === 1 ? selectedLabels[0] : `已选 ${selectedLabels.length} 项`

  return (
    <details className={cn('relative min-w-0', className)}>
      <summary
        className={cn(
          'flex h-9 w-full cursor-pointer list-none items-center justify-between rounded-md border border-card-border bg-card px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 [&::-webkit-details-marker]:hidden',
          compact && 'h-7 px-2 text-xs',
        )}
        aria-labelledby={labelId}
      >
        <span id={labelId} className="truncate">{summary}</span>
        <span className="ml-2 text-muted">⌄</span>
      </summary>
      <div className="absolute z-20 mt-1 max-h-64 w-full min-w-36 overflow-y-auto rounded-md border border-card-border bg-card p-1 shadow-xl">
        {options.map(option => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-xs text-foreground hover:bg-surface">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => onChange(value.includes(option.value) ? value.filter(item => item !== option.value) : [...value, option.value])}
              className="h-3.5 w-3.5 accent-primary"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </details>
  )
}
