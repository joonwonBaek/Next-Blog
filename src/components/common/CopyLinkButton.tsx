'use client';

import { Check, Link } from 'lucide-react';

import { Button } from '../ui/button';
import { useToast } from '../ui/useToast';

const CopyLinkButton = () => {
  const { toast } = useToast();

  const ToastTitle = (
    <div className="flex items-center gap-3">
      <Check size={16} /> Successfully Copied
    </div>
  );

  const copyToast = () => toast({ title: ToastTitle });

  return (
    <Button variant="outline" size="icon" onClick={copyToast}>
      <Link size={16} />
    </Button>
  );
};

export default CopyLinkButton;
