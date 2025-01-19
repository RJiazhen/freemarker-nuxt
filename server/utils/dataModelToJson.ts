/**
 * Converts a data model string to a JSON object
 */
export const dataModelToJson = (dataModel: string) => {
  const dataModelList = dataModel.split('\n');
  const json = dataModelList.reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = JSON.parse(value.trim());
    }
    return acc;
  }, {} as { [key: string]: any });

  return json;
};
