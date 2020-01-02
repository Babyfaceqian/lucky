import UploadPage from '../modules/uploadPage/views';
import DrawPage from '../modules/drawPage/views';
export const menuList = [
  {
    name: '上传',
    to: '/upload',
    comp: UploadPage
  },
  {
    name: '抽奖',
    to: '/draw',
    comp: DrawPage
  }
];
