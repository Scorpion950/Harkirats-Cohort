export const Button = ({
    disabled,
    children,
    onClick,
    variant //sm or mg or lg....
}) => {
    return (
        <span
            className={`inline-block rounded-2xl px-10 py-8 cursor-pointer ${
                disabled ? "bg-blue-200" : "bg-green-500"
            }`}
            onClick={onClick}
        >
            {children}
        </span>
    );
}