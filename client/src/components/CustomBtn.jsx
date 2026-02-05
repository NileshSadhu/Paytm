const CustomBtn = ({ label, type = "submit", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full bg-white text-black font-semibold
        py-2 rounded-lg
        hover:bg-neutral-200
        transition duration-200
      "
    >
      {label}
    </button>
  );
};

export default CustomBtn;
