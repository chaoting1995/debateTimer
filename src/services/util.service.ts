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

const ServiceUtil = {
  convertNumberInputOnChange,
  roundDownDecimals,
  debounce
};

export default ServiceUtil;