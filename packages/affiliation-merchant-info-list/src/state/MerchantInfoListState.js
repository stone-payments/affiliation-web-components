export const getInfo = ({ info }) => {
  const [modeledData] = info;

  if (modeledData) {
    return modeledData;
  }

  return '';
};

