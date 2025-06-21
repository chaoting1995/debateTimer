import React from 'react';

import { Status, STATUS_LOADED, STATUS_ERROR } from 'modules/form/form';

type VerifyRules<EnumTypeGuide> = {
  require?: boolean;
  requireSelect?: boolean;
  enumTypeGuide?: EnumTypeGuide;
}

interface UseFormColumnProps<T, EnumTypeGuide = unknown> {
  value: T;
  defaultValue: T;
  placeholder?: string;
  verifyRules?: VerifyRules<EnumTypeGuide>;
}

const useFormColumn =<T, EnumTypeGuide = unknown>(props: UseFormColumnProps<T, EnumTypeGuide>) => {
  const { placeholder } = props;
  const [value, setValue] = React.useState<T>(props.defaultValue);
  const [status, setStatus] = React.useState<Status>(STATUS_LOADED);

  // props.value，轉成 formColumn value
  React.useEffect(() => {
    setValue(props.value);
  }, [props.value, props.defaultValue])

  const onChange = React.useCallback((_value: T) => {
    setValue(_value);
  }, []);

  const onVarify = React.useCallback((): boolean => {
    if (!props.verifyRules) return true;
    if (props.verifyRules.require) {
      const verify = value !== '' ? true : false;
      if(verify) {
        setStatus(STATUS_LOADED)
      } else { 
        setStatus({ ...STATUS_ERROR, message: "此欄位必填"});
      }
      return verify;
    }
    
    if (props.verifyRules.requireSelect) {
      const verify = value !== '' ? true : false;
      if(verify) {
        setStatus(STATUS_LOADED)
      } else { 
         setStatus({ ...STATUS_ERROR, message: "此欄位必選"});
      }
      return verify
    }
    
    if (props.verifyRules.enumTypeGuide) {
      const IsEnum = <EnumTypeGuide extends object>(enumObj: EnumTypeGuide, input: unknown): input is EnumTypeGuide[keyof EnumTypeGuide] => {
        return Object.values(enumObj).includes(input as EnumTypeGuide[keyof EnumTypeGuide]);
      };
      
      const verify = IsEnum(props.verifyRules.enumTypeGuide, value) ? true : false;
      if (verify) {
        setStatus(STATUS_LOADED)
      } else {
        setStatus({ ...STATUS_ERROR, message: `此欄位必須是${Object.values(props.verifyRules.enumTypeGuide).join(',')}`})
      }
      return verify
    }
    
    return true;
  }, [value, props.verifyRules]);
  
  return { value, status, placeholder, onChange, onVarify };
}

export default useFormColumn;