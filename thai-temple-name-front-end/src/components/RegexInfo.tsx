import { FC, HTMLAttributes, useEffect, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RegexInfoProps extends HTMLAttributes<HTMLDivElement> {}

const RegexInfo: FC<RegexInfoProps> = ({ className }) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/regexinfo.md");
        const markdown = await response.text();
        setMarkdown(markdown);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarkdown();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader2 className={`${className} animate-spin`} />}
      {!isLoading && (
        <ReactMarkdown
          className={className}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              return (
                <code
                  className={`${className} text-sm md:text-base bg-gray-300 rounded-sm`}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      )}
    </>
  );
};
export default RegexInfo;
