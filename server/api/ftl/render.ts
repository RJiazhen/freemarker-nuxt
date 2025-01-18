import Freemarker from 'freemarker';

export default defineEventHandler(async (event) => {
  const { template, dataModal } = await readBody(event);
  const body = await readBody(event);

  const fm = new Freemarker();

  console.log(fm);

  const html = await new Promise((resolve, reject) => {
    fm.render(template, dataModal, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  return {
    html,
  };
});
