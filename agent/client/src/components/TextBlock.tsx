interface TextBlockProps {
  text: string;
}

export default function TextBlock({ text }: TextBlockProps) {
  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed">
      {text}
    </div>
  );
}
