export const formatDate = (date) => {
  if (!date) return '--';

  const d = new Date(date);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return formatter.format(d).replace(',', '');
};

export const getBasePath = (roleId) => {
  if(!roleId) return;

  return roleId == 1 ? 'admin' : roleId == 2 ? 'merchant' : 'user' 
}