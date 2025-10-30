import { useState } from "react";
import { Copy } from "lucide-react";

interface JsonBlockProps {
  title?: string;
  data: object | string;
  maxHeight?: string; // optional custom height
}

export const JsonBlock = ({ title = "Response Example", data, maxHeight = "300px" }: JsonBlockProps) => {
  const [copied, setCopied] = useState(false);

  const formattedJson =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mb-8">
      {title && (
        <h4 className="font-semibold text-gray-900 mb-3">{title}:</h4>
      )}

      <div className="relative">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
          title="Copy JSON"
        >
          <Copy className="w-7 h-5" />
        </button>

        {/* Scrollable JSON block */}
        <pre
          className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm"
          style={{ maxHeight }}
        >
          <code>{formattedJson}</code>
        </pre>

        {/* Copy status */}
        {copied && (
          <span className="absolute right-10 top-3 text-green-400 text-xs font-semibold">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};
