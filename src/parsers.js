import yaml from 'js-yaml';
import ini from 'ini-config-parser';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default type => parsers[type];
