export function Input({ type, value, onChange, className }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`border rounded p-2 ${className}`}
      />
    );
  }
  