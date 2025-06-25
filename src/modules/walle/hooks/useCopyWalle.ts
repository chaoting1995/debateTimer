import { WalleContent } from 'modules/walle/resources/walle.type';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

export type UseSlotMachine = (name: string, contents: WalleContent[]) => void;

const useCopyWalle = (): UseSlotMachine => {
  const copyToClipboard = useCopyToClipboard();
  const onCopyWalle = (name: string, contents: WalleContent[]) => {
    const walleName = `攻防群組名稱：${name}\n-------\n攻防子項列表：\n-------\n`
    const walleContents = contents.map(item => item.content.trim()).join('\n✂\n');
    const walleText = [walleName, walleContents].join('');
    copyToClipboard(walleText, '複製成功')
  };

  return onCopyWalle;
}

export default useCopyWalle;