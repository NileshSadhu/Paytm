const CustomInputs = ({ placeholder, type = "text", onChange, value }) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="
        w-full bg-black border border-neutral-700
        text-white px-3 py-2 rounded-lg
        placeholder-neutral-500
        focus:outline-none focus:border-white
        transition duration-200
      "
    />
  );
};

export default CustomInputs;
