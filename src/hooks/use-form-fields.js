import { useCallback, useState } from "react";

export default function useFormFields(init) {
  const [values, setValues] = useState(init);

  const onChange = useCallback((e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }, [values]);

  return { values, onChange };
};

