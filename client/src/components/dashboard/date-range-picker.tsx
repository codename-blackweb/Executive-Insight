import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import type { DateRange } from "@shared/schema";

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const presets = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year to Date' },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const handlePresetChange = (preset: string) => {
    const now = new Date();
    let start = new Date();
    
    switch (preset) {
      case 'today':
        start = now;
        break;
      case '7d':
        start.setDate(now.getDate() - 7);
        break;
      case '30d':
        start.setDate(now.getDate() - 30);
        break;
      case '90d':
        start.setDate(now.getDate() - 90);
        break;
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1);
        break;
    }
    
    onChange({
      start: start.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
      preset: preset as DateRange['preset'],
    });
  };

  return (
    <div className={className}>
      <Select 
        value={value.preset || '30d'} 
        onValueChange={handlePresetChange}
      >
        <SelectTrigger 
          className="w-[180px] bg-card border-border" 
          data-testid="select-date-range"
        >
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem 
              key={preset.value} 
              value={preset.value}
              data-testid={`option-date-${preset.value}`}
            >
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
