import {getApi} from './common';

export async function sendVerifyCode({by, mobile, email}) {
  return getApi('/security/sendVerifyCode', {by, mobile, email});
}
