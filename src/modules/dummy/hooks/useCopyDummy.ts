import { DummyContent } from 'modules/dummy/resources/dummy.type';
import useCopyToClipboard from "hooks/useCopyToClipboard";

export type UseSlotMachine = (name: string, contents: DummyContent[]) => void;

const useCopyDummy = (): UseSlotMachine => {
  const copyToClipboard = useCopyToClipboard();
  const onCopyDummy = (name: string, contents: DummyContent[]) => {
    const output = [
      `攻防群組名稱：${name}`,
      ...contents.map(item => item.content.trim()),
    ].join("\n-------\n");
    copyToClipboard(output, '複製成功')
  };

  return onCopyDummy;
}

export default useCopyDummy;