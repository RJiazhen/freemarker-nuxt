import Freemarker from 'freemarker';
import { dataModelToJson } from '~/server/utils/dataModelToJson';

export default defineEventHandler(async (event) => {
  const { template, dataModel } = await readBody(event);

  const fm = new Freemarker();

  const dataModelJson =
    typeof dataModel === 'string' ? dataModelToJson(dataModel) : dataModel;

  const html = await new Promise((resolve, reject) => {
    fm.render(template, dataModelJson, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  return {
    result: html,
  };
});
