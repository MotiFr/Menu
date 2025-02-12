import { useEffect, useRef } from 'react';

const AutoResizeTextarea = ({ value, onChange, className, placeholder }) => {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e) => {
    onChange(e);
    adjustHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      style={{ resize: 'none', overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}
    />
  );
};

export default AutoResizeTextarea;