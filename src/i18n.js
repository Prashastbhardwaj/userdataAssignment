import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import LanguageDetector from 'i18next-browser-languagedetector'; 
import Backend from 'i18next-http-backend'; 

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    lng: 'en', 
    fallbackLng: 'en', 
    // debug: true, 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
    resources: {
        en: {
          translation: {
           
            first_name: 'First Name',
            last_name: 'Last Name',
            email: 'Email',
            dob: 'Date of Birth',
            actions: 'Actions',
          
          },
        },
        fr: {
          translation: {
            first_name: 'Prénom',
            last_name: 'Nom',
            email: 'Email',
            dob: 'Date de naissance',
            actions: 'Actions',
            
          },
        },
      },
  });

export default i18next;
