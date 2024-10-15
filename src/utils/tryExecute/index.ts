import _ from 'lodash';

type CatchCallback = (message: string, err?: any) => void;
export default async function tryExecute(
  callback: () => void,
  catchCallback: CatchCallback = openMessage,
) {
  try {
    return await callback();
  } catch (err: any) {
    const message = err.Message || err.message;
    catchCallback(message, err);
  }
}

function openMessage(message: any) {
  console.error(message);
}
