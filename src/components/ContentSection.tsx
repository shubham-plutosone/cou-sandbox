import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  id: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

export function ContentSection({
  id,
  title,
  children,
  className,
}: ContentSectionProps) {
  return (
    <section
      data-section={id}
      className={cn("py-8 scroll-mt-20", className)}
    >
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-red-500 bg-gray-100 px-4 py-2 rounded-lg inline-block shadow-sm tracking-wide uppercase">
          {title}
        </h1>
        <div className="prose prose-slate max-w-none">
          {children || (
            <div className="space-y-4 text-muted-foreground">
              <p>
                This section contains detailed information about {title}. The content
                would include API specifications, request/response examples, and usage
                guidelines.
              </p>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Example Content
                </h3>
                <p className="text-sm">
                  Documentation content for this section would be displayed here,
                  including code examples, parameter descriptions, and best practices.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContentSubSection({
  id,
  title,
  children,
  className,
}: ContentSectionProps) {
  return (
    <section
      data-section={id}
      className={cn("py-8 scroll-mt-20", className)}
    >
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">
          {title}
        </h2>
        <div className="prose prose-slate max-w-none">
          {children || (
            <div className="space-y-4 text-muted-foreground">
              <p>
                This section contains detailed information about {title}. The content
                would include API specifications, request/response examples, and usage
                guidelines.
              </p>
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Example Content
                </h3>
                <p className="text-sm">
                  Documentation content for this section would be displayed here,
                  including code examples, parameter descriptions, and best practices.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
