export const Input = ({
    placeholder,
    type,
    onClick,
}) => {
    return (
        <span
            className="p-4 text-2xl px-2 py-2 cursor-pointer bg-blue-500 inline-block ml-4"
            onClick={onClick}
        >
            <input
                type={type}
                placeholder={placeholder}
                className="bg-blue-200 outline-none"
            />
        </span>
    );
}