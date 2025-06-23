import { DummyContent } from 'modules/dummy/resources/dummy.type';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

export type UseSlotMachine = (name: string, contents: DummyContent[]) => void;

const useCopyDummy = (): UseSlotMachine => {
  const copyToClipboard = useCopyToClipboard();
  const onCopyDummy = (name: string, contents: DummyContent[]) => {
    const dummyName = `攻防群組名稱：${name}\n-------\n攻防子項列表：\n-------\n`
    const dummyContents = contents.map(item => item.content.trim()).join('\n✂\n');
    const dummyText = [dummyName, dummyContents].join('');
    copyToClipboard(dummyText, '複製成功')
  };

  return onCopyDummy;
}

export default useCopyDummy;