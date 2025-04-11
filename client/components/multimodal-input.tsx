import { memo, useState } from 'react';
import { ArrowUpIcon, PaperclipIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface MultimodalInputProps {
  chatId: string;
  className?: string;
  onSubmit?: (message: string) => void;
}

function PureMultimodalInput({ chatId, className, onSubmit }: MultimodalInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage('');
    } else {
      toast.error('Please enter a message before sending.');
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      <input type="file" className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none" multiple />
      <Textarea
        placeholder="Send a message..."
        className={`min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-400 ${className}`}
        rows={2}
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="absolute bottom-0 p-2 w-fit flex flex-row justify-start">
        <Button
          className="rounded-md rounded-bl-lg p-[7px] h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200"
          variant="ghost"
        >
          <PaperclipIcon size={14} />
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        <Button
          className="rounded-full p-1.5 h-fit border dark:border-zinc-600 bg-zinc-700 hover:bg-white"
          onClick={handleSubmit}
        >
          <ArrowUpIcon size={14} />
        </Button>
      </div>
    </div>
  );
}

export const MultimodalInput = memo(PureMultimodalInput);