import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
}

export const JsonEditor = ({ value, onChange, label, placeholder, className, readonly }: JsonEditorProps) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string>('');

  const handleChange = (newValue: string) => {
    onChange(newValue);
    
    if (!newValue.trim()) {
      setIsValid(true);
      setError('');
      return;
    }

    try {
      JSON.parse(newValue);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError((err as Error).message);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch (err) {
      // Invalid JSON, don't format
    }
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <button
            type="button"
            onClick={formatJson}
            className="text-xs text-primary hover:text-primary/80 font-medium"
            disabled={!isValid}
          >
            Format JSON
          </button>
        </div>
      )}
      
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={`font-mono text-sm min-h-[200px] ${!isValid ? 'border-destructive' : ''}`}
          readOnly={readonly}
        />
        
        {isValid && value.trim() && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      
      {!isValid && error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Invalid JSON: {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};