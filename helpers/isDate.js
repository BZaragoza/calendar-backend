import moment from 'moment';

export const isDate = (value, {req, location, path}) => {
  
  if (!value) return false;

  const date = moment(value);

  return date.isValid()
}