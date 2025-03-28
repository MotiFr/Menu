"use client"
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import ThemedBackground from '@/components/Menu/ThemeBG';
import { themes } from '@/components/Menu/Themes';
import AutoResizeTextarea from '@/components/Menu/TextareaSize';
import { List, LayoutGrid, Image as ImageIcon, MessageSquare, X } from 'lucide-react';
import CategoryMenu from '@/components/ViewMenu/CategoryMenu';
import Def from '@/components/ViewMenu/Def';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const translations = {
  eng: {
    chooseTheme: "Choose Your Theme",
    editHeader: "Edit Header And Description By Clicking",
    saveChanges: "Save changes",
    headerTooLong: "Header is too long",
    descTooLong: "Description is too long",
    yourMenu: "Your Menu",
    hebrewTitle: "Hebrew Title",
    englishTitle: "English Title",
    hebrewDesc: "Hebrew Description",
    englishDesc: "English Description",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    socialLinks: "Social media links",
    footerText: "Footer text",
    editFooter: "Edit footer",
    setMessage: "Set Message",
    messageText: "Message Text",
    messageTime: "Message Duration (seconds)",
    selectItem: "Select Menu Item",
    noItem: "No specific item",
  },
  heb: {
    chooseTheme: "בחר עיצוב",
    editHeader: "לחץ על הכותרת ועל התיאור בשביל לערוך",
    saveChanges: "שמור שינויים",
    headerTooLong: "הכותרת ארוכה מדי",
    descTooLong: "התיאור ארוך מדי",
    yourMenu: "התפריט שלך",
    hebrewTitle: "כותרת בעברית",
    englishTitle: "כותרת באנגלית",
    hebrewDesc: "תיאור בעברית",
    englishDesc: "תיאור באנגלית",
    edit: "ערוך",
    save: "שמור",
    cancel: "ביטול",
    socialLinks: "קישור לרשתות חברתיות",
    footerText: "טקסט תחתית",
    editFooter: "ערוך תחתית",
    setMessage: "הגדר הודעה",
    messageText: "טקסט ההודעה",
    messageTime: "משך זמן ההודעה (שניות)",
    selectItem: "בחר פריט מהתפריט",
    noItem: "ללא פריט ספציפי",
  }
};

const ThemeButton = ({ themeName, colors, isActive, onClick, setIsThemed }) => (
  <button
    onClick={() => onClick(themeName, setIsThemed(true))}
    className={`relative w-12 h-12 rounded-full m-2 transition-all duration-300 
      hover:scale-110 hover:shadow-lg transform
      ${isActive ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-black dark:ring-white scale-110' : 'scale-100'}`}
    style={{
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 33%, ${colors.secondary} 33%, ${colors.secondary} 66%, ${colors.accent} 66%, ${colors.accent} 100%)`
    }}
    title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
  />
);

const BackgroundImageDialog = ({ isOpen, onClose, onSave, currentLang, currentImage }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentImage) {
      setImageUrl(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setError(currentLang === 'heb' ? 'אנא העלה קובץ JPEG או PNG' : 'Please upload a JPEG or PNG file');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setImageUrl(data.url);
      setUploadedFile(null);
    } catch (error) {
      setError(currentLang === 'heb' ? 'העלאת התמונה נכשלה' : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    onSave(imageUrl);
    onClose();
  };

  const handleRemove = () => {
    setImageUrl('');
    onSave('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentLang === 'heb' ? 'הגדר תמונת רקע' : 'Set Background Image'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">
              {currentLang === 'heb' ? 'קישור לתמונה' : 'Image URL'}
            </Label>
            <Input
              id="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder={currentLang === 'heb' ? 'הכנס קישור לתמונה' : 'Enter image URL'}
            />
          </div>
          <div className="grid gap-2">
            <Label>
              {currentLang === 'heb' ? 'או העלה תמונה' : 'Or upload an image'}
            </Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  currentLang === 'heb' ? 'מעלה...' : 'Uploading...'
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {currentLang === 'heb' ? 'בחר תמונה' : 'Choose Image'}
                  </>
                )}
              </Button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {imageUrl && (
            <div className="relative h-32 w-full rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2">
          {imageUrl && (
            <Button
              variant="destructive"
              onClick={handleRemove}
              className="flex-1"
            >
              {currentLang === 'heb' ? 'הסר תמונת רקע' : 'Remove Background'}
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose}>
              {currentLang === 'heb' ? 'ביטול' : 'Cancel'}
            </Button>
            <Button onClick={handleSave}>
              {currentLang === 'heb' ? 'שמור' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MessageDialog = ({ isOpen, onClose, onSave, currentLang, menu, currentMessage, theme }) => {
  const [message, setMessage] = useState({
    heb: currentMessage?.heb || '',
    eng: currentMessage?.eng || '',
    time: currentMessage?.time || 10,
    item: currentMessage?.item || null
  });
  const activeTheme = themes[theme] || themes.default;

  const handleSave = () => {
    onSave(message);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentLang === 'heb' ? 'הגדר הודעה' : 'Set Message'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Message Preview */}
          <div className="mb-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900">
            <h3 className="text-sm font-medium mb-2">{currentLang === 'heb' ? 'תצוגה מקדימה' : 'Preview'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {currentLang === 'heb' 
                ? 'ההודעה תופיע בראש התפריט. אם בחרת פריט, לחץ על ההודעה יגלול אליו. מומלץ להוסיף "לחץ כאן" להודעה.'
                : 'The message will appear at the top of the menu. If you selected an item, clicking the message will scroll to it. It\'s recommended to add "Click here" to the message.'}
            </p>
            <div 
              className="relative p-4 rounded-xl shadow-lg border-b backdrop-blur-md"
              style={{
                backgroundColor: `${activeTheme.primary}dd`,
                borderColor: `${activeTheme.secondary}40`,
              }}
            >
              <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
                <div 
                  className="h-full bg-white/40 transition-all duration-1000 ease-linear"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-white">
                  {currentLang === 'heb' ? message.heb : message.eng}
                </span>
                <div className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Message Input Fields */}
          <div className="grid gap-2">
            <Label htmlFor="message-heb">
              {currentLang === 'heb' ? 'הודעה בעברית' : 'Hebrew Message'}
            </Label>
            <Input
              id="message-heb"
              value={message.heb}
              onChange={(e) => setMessage(prev => ({ ...prev, heb: e.target.value }))}
              placeholder={currentLang === 'heb' ? 'הכנס הודעה בעברית' : 'Enter Hebrew message'}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message-eng">
              {currentLang === 'heb' ? 'הודעה באנגלית' : 'English Message'}
            </Label>
            <Input
              id="message-eng"
              value={message.eng}
              onChange={(e) => setMessage(prev => ({ ...prev, eng: e.target.value }))}
              placeholder={currentLang === 'heb' ? 'הכנס הודעה באנגלית' : 'Enter English message'}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message-time">
              {currentLang === 'heb' ? 'משך זמן (שניות)' : 'Duration (seconds)'}
            </Label>
            <Input
              id="message-time"
              type="number"
              min="1"
              max="60"
              value={message.time}
              onChange={(e) => setMessage(prev => ({ ...prev, time: parseInt(e.target.value) || 10 }))}
            />
          </div>
          <div className="grid gap-2">
            <Label>
              {currentLang === 'heb' ? 'בחר פריט מהתפריט' : 'Select Menu Item'}
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {message.item ? (currentLang === 'heb' ? message.item.name_heb : message.item.name_eng) : (currentLang === 'heb' ? 'ללא פריט ספציפי' : 'No specific item')}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-h-[200px] overflow-y-auto">
                <DropdownMenuItem onClick={() => setMessage(prev => ({ ...prev, item: null }))}>
                  {currentLang === 'heb' ? 'ללא פריט ספציפי' : 'No specific item'}
                </DropdownMenuItem>
                {menu.map(item => (
                  <DropdownMenuItem
                    key={item._id}
                    onClick={() => setMessage(prev => ({ ...prev, item }))}
                  >
                    {currentLang === 'heb' ? item.name_heb : item.name_eng}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {currentLang === 'heb' ? 'ביטול' : 'Cancel'}
          </Button>
          <Button onClick={handleSave}>
            {currentLang === 'heb' ? 'שמור' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function MenuPageClient() {
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState('heb');
  const [viewStyle, setViewStyle] = useState('default');

  useEffect(() => {
    const langParam = searchParams.get('lang');

    if (langParam && (langParam === 'eng' || langParam === 'heb')) {
      setCurrentLang(langParam);
    } else {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && (storedLang === 'eng' || storedLang === 'heb')) {
        setCurrentLang(storedLang);
      }
    }
  }, [searchParams]);

  const t = translations[currentLang];

  // Add style selector translations
  const styleTranslations = {
    eng: {
      styleSelector: "Menu Style",
      defaultStyle: "Default Style",
      categoriesStyle: "Categories Style"
    },
    heb: {
      styleSelector: "סגנון תפריט",
      defaultStyle: "סגנון רגיל",
      categoriesStyle: "סגנון קטגוריות"
    }
  };

  const [currentTheme, setCurrentTheme] = useState('default');
  const [isThemed, setIsThemed] = useState(false);
  const [menu, setMenu] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingChange, setLoadingChage] = useState(false);
  const [menuTitles, setMenuTitles] = useState({ heb: '', eng: '' });
  const [menuDescriptions, setMenuDescriptions] = useState({ heb: '', eng: '' });
  const [errText, setErrText] = useState('');
  const [footerText, setFooterText] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const redirect = useCallback(() => {
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/items');
        const json = await response.json();
        if (json.message === "Not authenticated") {
          redirect();
        }
        setCATEGORIES(json.categories);
        setMenu(json.items);
        setViewStyle(json.menu);
        setCurrentTheme(json.theme);
        setMenuDescriptions({
          heb: json.description.heb || '',
          eng: json.description.eng || ''
        });
        setMenuTitles({
          heb: json.header.heb || '',
          eng: json.header.eng || ''
        });
        setFooterText(json.footerText);
        setSocialLinks(json.socialLinks);
        setBackgroundImage(json.bg);
        setMessage(json.message);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [redirect]);

  if (loading) return (
    <div className="min-h-screen transition-all duration-500">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Theme selection and header editing section */}
        <div className="mb-8 p-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />

          {/* Theme buttons - circles */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-14 rounded-full" />
            ))}
          </div>

          {/* Header editing section - everything centered */}
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />

            <div className="space-y-10">
              <div className="mb-4">
                <Skeleton className="h-12 w-3/4 mx-auto" />
              </div>

              <div>
                <Skeleton className="h-24 w-full mx-auto" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  if (error) return <div>Error: {error.message}</div>;


  async function handleChanges(event) {
    event.preventDefault();
    setLoadingChage(true);

    if (menuTitles.heb.length > 150 || menuTitles.eng.length > 150) {
      setErrText(t.headerTooLong);
      setLoadingChage(false);
      return;
    }
    if (menuDescriptions.heb.length > 1500 || menuDescriptions.eng.length > 1500) {
      setErrText(t.descTooLong);
      setLoadingChage(false);
      return;
    }

    try {
      const response = await fetch('/api/changeMenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: currentTheme,
          menu: viewStyle,
          header: {
            heb: menuTitles.heb,
            eng: menuTitles.eng
          },
          description: {
            heb: menuDescriptions.heb,
            eng: menuDescriptions.eng
          },
          bg: backgroundImage,
          message: message
        }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('header', JSON.stringify(result.header));
        localStorage.setItem('description', JSON.stringify(result.description));
        setLoadingChage(false);
        setIsThemed(false);
      } else {
        setLoadingChage(false);
      }

    } catch (error) {
      console.error('Error saving changes:', error);
      setLoadingChage(false);
    }
  }

  const textDirection = currentLang === 'heb' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen transition-all duration-500 max-w-2xl mx-auto" dir={textDirection}>
      {/* Warning Message - Only show when changes are made */}
      {isThemed && (
        <div className="sticky top-0 z-50 w-full p-4 bg-yellow-50 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 shadow-lg">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-yellow-800 dark:text-yellow-200 font-medium text-center">
              {currentLang === 'heb' ? 'לא לשכוח לשמור שינויים!' : 'Make sure to save your changes!'}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Style Selector */}
        <div className="mb-5 p-4 rounded-xl bg-white/15 dark:bg-black/15 backdrop-blur-xl shadow-lg border border-white/10 dark:border-white/5">
          <h2 className="text-base font-medium mb-3 text-center opacity-75">{styleTranslations[currentLang].styleSelector}</h2>
          <div className="flex justify-center bg-white/5 dark:bg-black/30 backdrop-blur-md p-1 rounded-lg">
            <button
              onClick={() => { setViewStyle('Default'); setIsThemed(true); }}
              className={`relative flex-1 py-2.5 px-3 rounded-md transition-all duration-200 font-medium flex items-center justify-center space-x-2 rtl:space-x-reverse
                ${viewStyle === 'Default'
                  ? 'bg-gradient-to-r from-primary/90 to-primary/80 text-white shadow-md'
                  : 'hover:bg-white/20 dark:hover:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                }
                focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30`}
              aria-pressed={viewStyle === 'default'}
            >
              <List className="h-4 w-4" />
              <span>{styleTranslations[currentLang].defaultStyle}</span>
              {viewStyle === 'default' && <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full opacity-70" />}
            </button>
            <button
              onClick={() => { setViewStyle('CategoryMenu'); setIsThemed(true); }}
              className={`relative flex-1 py-2.5 px-3 rounded-md transition-all duration-200 font-medium flex items-center justify-center space-x-2 rtl:space-x-reverse
                ${viewStyle === 'CategoryMenu'
                  ? 'bg-gradient-to-r from-primary/90 to-primary/80 text-white shadow-md'
                  : 'hover:bg-white/20 dark:hover:bg-gray-800/30 text-gray-700 dark:text-gray-300'
                }
                focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30`}
              aria-pressed={viewStyle === 'categories'}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>{styleTranslations[currentLang].categoriesStyle}</span>
              {viewStyle === 'categories' && <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full opacity-70" />}
            </button>
          </div>
        </div>

        <div className="mb-8 p-6 rounded-xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20">
          <h2 className="text-lg font-semibold mb-4 text-center">{t.chooseTheme}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(themes).map(([name, colors]) => (
              <ThemeButton
                key={name}
                themeName={name}
                colors={colors}
                isActive={currentTheme === name}
                onClick={setCurrentTheme}
                setIsThemed={setIsThemed}
              />
            ))}
          </div>

          {/* Add background image button */}
          <div className="mt-6 text-center space-y-4">
            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full max-w-xs"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {currentLang === 'heb' ? 'הגדר תמונת רקע' : 'Set Background Image'}
                </Button>
              </DialogTrigger>
              <BackgroundImageDialog
                isOpen={isImageDialogOpen}
                onClose={() => setIsImageDialogOpen(false)}
                onSave={(url) => {
                  setBackgroundImage(url);
                  setIsThemed(true);
                }}
                currentLang={currentLang}
                currentImage={backgroundImage}
              />
            </Dialog>

            <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full max-w-xs"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {currentLang === 'heb' ? 'הגדר הודעה' : 'Set Message'}
                </Button>
              </DialogTrigger>
              <MessageDialog
                isOpen={isMessageDialogOpen}
                onClose={() => setIsMessageDialogOpen(false)}
                onSave={(newMessage) => {
                  setMessage(newMessage);
                  setIsThemed(true);
                }}
                currentLang={currentLang}
                menu={menu}
                currentMessage={message}
                theme={currentTheme}
              />
            </Dialog>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-lg font-semibold mb-4 text-center mt-6">{t.editHeader}</h2>
            <form onSubmit={handleChanges}>
              <div className="space-y-4">
                <div className="mb-4">
                  <AutoResizeTextarea
                    className="bg-inherit text-4xl font-bold w-full text-center"
                    placeholder={currentLang === 'heb' ? "כותרת בעברית" : "English Title"}
                    value={menuTitles[currentLang]}
                    onChange={e => {
                      setMenuTitles(prev => ({ ...prev, [currentLang]: e.target.value }));
                      setIsThemed(true);
                    }}
                    dir={currentLang === 'heb' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <AutoResizeTextarea
                    className="bg-inherit text-lg opacity-80 w-full text-center"
                    placeholder={currentLang === 'heb' ? "תיאור בעברית" : "English Description"}
                    value={menuDescriptions[currentLang]}
                    onChange={e => {
                      setMenuDescriptions(prev => ({ ...prev, [currentLang]: e.target.value }));
                      setIsThemed(true);
                    }}
                    dir={currentLang === 'heb' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div className='w-full relative mt-14'>
                {isThemed && (
                  <button
                    className={`absolute right-4 bottom-5 px-6 py-3 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${loadingChange ? 'bg-primary-light cursor-not-allowed opacity-70' : 'bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark hover:shadow-xl'}`}
                    type="submit"
                  >
                    {t.saveChanges}
                  </button>
                )}
                <div className='text-lg text-red-500'>{errText}</div>
              </div>
            </form>
          </div>
        </div>

        {/* Menu Display with Frame */}
        <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-black/50 dark:border-white/40 backdrop-blur-md">
          {
            viewStyle === 'CategoryMenu' ? (
              <CategoryMenu
                CATEGORIES={CATEGORIES}
                theme={currentTheme}
                bg={backgroundImage}
                header={menuTitles}
                description={menuDescriptions}
                menu={menu}
                footerText={footerText}
                socialLinks={socialLinks}
                message={message}
              />
            ) : (
              <Def
                CATEGORIES={CATEGORIES}
                theme={currentTheme}
                header={menuTitles}
                bg={backgroundImage}
                description={menuDescriptions}
                menu={menu}
                footerText={footerText}
                socialLinks={socialLinks}
                message={message}
              />
            )
          }
        </div>

      </div>
    </div>
  );
}