
if (typeof window === 'undefined') global.window = { location: { host: 'testhost' } };

const env = ((host) => {
  switch (true) {
    case host.includes('cocy.shop'):
      return 'cocy';

    case host.includes('ngyn.store'):
      return 'ngyn';

    default:
      return 'develop';
  }
})(window.location.host);

export const config = require(`./config/config.${env}`);
