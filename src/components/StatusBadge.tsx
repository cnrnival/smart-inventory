'use client';

import { BatchStatus } from '@/types/inventory';

interface StatusBadgeProps {
  status: BatchStatus;
}

const config: Record<BatchStatus, { label: string; className: string }> = {
  valid: { label: 'Válido', className: 'bg-green-100 text-green-800 border-green-200' },
  alert: { label: 'Alerta', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  critical: { label: 'Crítico', className: 'bg-red-100 text-red-800 border-red-200' },
  expired: { label: 'Vencido', className: 'bg-gray-100 text-gray-800 border-gray-300' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}