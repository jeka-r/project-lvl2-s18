import formatePlain from './plainformater';
import formateJson from './jsonformater';
import formateDefault from './defaultformater';

const formaters = {
  plain: formatePlain,
  json: formateJson,
  default: formateDefault,
};

export default (type) => {
  if (formaters[type]) {
    return formaters[type];
  }
  return formaters.default;
};
