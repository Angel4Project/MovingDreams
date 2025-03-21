import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from '../hooks/useLanguage';

const AccessibilityButton = () => {
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(100);
  
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };
  
  const handleContrastChange = (value: number[]) => {
    setContrast(value[0]);
    if (value[0] > 100) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };
  
  const resetSettings = () => {
    setFontSize(100);
    setContrast(100);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="fixed top-36 left-4 w-12 h-12 bg-secondary text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-opacity-90 transition"
          aria-label={t('accessibility')}
        >
          <i className="fas fa-universal-access text-xl"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('accessibilitySettings')}</DialogTitle>
          <DialogDescription>
            {t('accessibilityDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">{t('fontSize')}: {fontSize}%</h4>
            <Slider 
              defaultValue={[fontSize]} 
              max={200} 
              min={80} 
              step={10} 
              onValueChange={handleFontSizeChange}
            />
            <div className="flex justify-between text-sm">
              <span>A</span>
              <span className="text-lg">A</span>
              <span className="text-2xl">A</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{t('contrast')}: {contrast}%</h4>
            <Slider 
              defaultValue={[contrast]} 
              max={150} 
              min={100} 
              step={10} 
              onValueChange={handleContrastChange}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={resetSettings}
          >
            {t('resetSettings')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessibilityButton;
