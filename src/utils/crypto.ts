import CryptoJS from 'crypto-js'

export const md5Encrypt = (target: string) => {
  return CryptoJS.MD5(target).toString()
}
