function calculateLocale(locales) {
  // whatever you do to pick a locale for the user:
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;

  return locales.includes(language.toLowerCase()) ? language : 'en-US';
}

export function initialize(applicationInstance) {
  let i18n = applicationInstance.lookup('service:i18n');
  i18n.set('locale', calculateLocale(i18n.get('locales')));

  let calendar = applicationInstance.lookup('service:power-calendar');
  calendar.set('locale', calculateLocale(i18n.get('locales')));
}


export default {
  name: 'i18n',
  initialize
};
