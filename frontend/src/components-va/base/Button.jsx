import ScaleLoader from "react-spinners/ScaleLoader";

const Button = ({ label, onClick, isLoading, disabled }) => {
  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";

  const Contents = isLoading ? (
    <ScaleLoader
      color="#000"
      height={10}
      width={2.5}
      margin={0.5}
      loading={true}
      size={50}
      css={{ display: "block", margin: "0 auto" }}
    />
  ) : (
    <p className="m-0">{label}</p>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-white text-black border-2 border-gray-300 rounded-lg py-2 px-5 text-lg shadow-md transition-all duration-300 ease-in-out opacity-${opacity} cursor-${cursor} hover:bg-gray-100`}
      style={{
        opacity,
        cursor,
      }}
    >
      {Contents}
    </button>
  );
};

export default Button;
