import MenuFooter from "../Menu/FooterView";
import MenuCard from "../Menu/MenuCard";
import ThemedBackground from "../Menu/ThemeBG";
import ViewTracker from "../Menu/ViewTracker";
import { categoryClasses } from '@/components/Menu/Themes';


export default function Def({ CATEGORIES, theme, header, description, menu, footerText, socialLinks, restname, isRTL, getLocalizedValue }) {
  return (
    <>
       <div className="min-h-screen transition-all duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
        <ThemedBackground theme={theme} />
        <div className="max-w-7xl mx-auto px-2 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {getLocalizedValue(header.eng, header.heb)}
            </h1>

            <p className="text-lg opacity-80">
              {getLocalizedValue(description.eng, description.heb)}
            </p>
          </div>

          <div className="space-y-4">
            {CATEGORIES?.map((category) => {
              const items = menu.filter(item => item.category === category.name && item.seen);
              if (items.length === 0) return null;

              return (
                <details
                  key={category.name}
                  className={`${categoryClasses[theme]} rounded-2xl border backdrop-blur-md p-2 group`}
                  open
                >
                  <summary className="pb-4 justify-between items-center cursor-pointer list-none select-none">
                    <h2 className={`text-2xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.name_eng, category.name_heb)}
                    </h2>
                    <p className={`opacity-80 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getLocalizedValue(category.description_eng, category.description_heb)}
                    </p>
                    <span className={`${isRTL ? 'left-2 group-open:rotate-90' : 'right-2 group-open:-rotate-90'} top-2 text-xl absolute transform transition-transform duration-300 `}>
                      {isRTL ? "►" : "◄"}
                    </span>
                  </summary>


                  <div className="pt-2">
                    <div className="space-y-2">
                      <MenuCard
                        items={items.map(item => ({
                          ...item,
                          name: getLocalizedValue(item.name_eng, item.name_heb),
                          description: getLocalizedValue(item.description_eng, item.description_heb)
                        }))}
                        theme={theme}
                        isRTL={isRTL}
                      />
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
        <ViewTracker
          restname={restname}
        />
        <MenuFooter
          currentLang={isRTL ? 'heb' : 'eng'}
          currentTheme={theme}
          Footer={{ footerText, socialLinks }}
        />
      </div>
    </>
  );
}