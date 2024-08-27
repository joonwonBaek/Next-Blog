'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownTrigger,
} from '@/components/ui/dropdown';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropDown>
      <DropDownTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropDownTrigger>
      <DropDownContent align="end">
        <DropDownItem onClick={() => setTheme('light')}>Light</DropDownItem>
        <DropDownItem onClick={() => setTheme('dark')}>Dark</DropDownItem>
        <DropDownItem onClick={() => setTheme('system')}>System</DropDownItem>
      </DropDownContent>
    </DropDown>
  );
};

export default ThemeSwitch;
