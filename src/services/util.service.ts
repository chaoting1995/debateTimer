const convertNumberInputOnChange = (input: string): string => {
  // remove excess 0 before integer, decimal
  input = input.replace(/0*([1-9]\d*|0\.\d+)/, "$1");
  // specify input 18 decimal places
  input = input.replace(/^\D*(\d*(?:\.\d{0,18})?).*$/g, "$1");
  return input;
};

const roundDownDecimals = (number: number, digits: number) => {
  const multiplier = 10 ** digits;
  return Math.floor(number * multiplier) / multiplier;
};

// eslint-disable-next-line
type Callback = (...args: any[]) => void;

const debounce = (fn: Callback, delay: number = 1000): Callback => {
  let timerID: NodeJS.Timeout | undefined;
  
  // eslint-disable-next-line
  return (...args: any[]) => {
    if (timerID) clearTimeout(timerID);
    timerID = setTimeout(() => fn(...args), delay);
  };
}

const speakText = (text: string) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';        // 設定語言
  utterance.rate = 1.2;            // 可調整速度
  utterance.volume = 0.5           // 指定朗讀音量
  window.speechSynthesis.cancel(); // 停止之前朗讀（避免重疊）
  window.speechSynthesis.speak(utterance);
};

const ServiceUtil = {
  convertNumberInputOnChange,
  roundDownDecimals,
  debounce,
  speakText
};

export default ServiceUtil;