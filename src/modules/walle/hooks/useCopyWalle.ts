import { WalleContent } from 'modules/walle/resources/walle.type';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { WALLE_LABEL, WALLE_CONTENT_LABEL } from 'modules/walle/resources/walle.constant';

type UseCopyWalle = (name: string, contents: WalleContent[]) => void;

const useCopyWalle = (): UseCopyWalle => {
  const copyToClipboard = useCopyToClipboard();
  const onCopyWalle = (name: string, contents: WalleContent[]) => {
    const walleName = `${WALLE_LABEL}名稱：${name}\n-------\n${WALLE_CONTENT_LABEL}列表：\n-------\n`;
    const walleContents = contents.map(item => item.content.trim()).join('\n✂\n');
    const walleText = [walleName, walleContents].join('');
    copyToClipboard(walleText, '複製成功');
  };

  return onCopyWalle;
}

export default useCopyWalle;