import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RegexInfoProps extends HTMLAttributes<HTMLDivElement> {}

const CodeBlock = ({children})=>{
  return <code className="bg-gray-300 rounded-sm p-1 text-sm">{children}</code>
}

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
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{ code: CodeBlock}}
    >
      {markdown}
    </ReactMarkdown>
  );
};
export default RegexInfo;
