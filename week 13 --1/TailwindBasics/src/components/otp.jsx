import { useRef, useState } from "react";

export function Otp() {
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();
    const ref6 = useRef();

    const [inputBoxVal1, setInputBoxVal1] = useState("");
    const [inputBoxVal2, setInputBoxVal2] = useState("");
    const [inputBoxVal3, setInputBoxVal3] = useState("");
    const [inputBoxVal4, setInputBoxVal4] = useState("");
    const [inputBoxVal5, setInputBoxVal5] = useState("");
    const [inputBoxVal6, setInputBoxVal6] = useState("");

    const [disabled, setDisabled] = useState(true);

    return <div className="flex justify-center">
        <SubOtpBox
            ref={ref1}
            inputBoxVal={inputBoxVal1}
            setInputBoxVal={setInputBoxVal1}
            onDone={() => {
                ref2.current.focus();
            }}
        ></SubOtpBox>

        <SubOtpBox
            ref={ref2}
            inputBoxVal={inputBoxVal2}
            setInputBoxVal={setInputBoxVal2}
            onDone={() => {
                ref3.current.focus();
            }}
            onBack={() => {
                ref1.current.focus();
            }}
        ></SubOtpBox>

        <SubOtpBox
            ref={ref3}
            inputBoxVal={inputBoxVal3}
            setInputBoxVal={setInputBoxVal3}
            onDone={() => {
                ref4.current.focus();
            }}
            onBack={() => {
                ref2.current.focus();
            }}
        ></SubOtpBox>

        <SubOtpBox
            ref={ref4}
            inputBoxVal={inputBoxVal4}
            setInputBoxVal={setInputBoxVal4}
            onDone={() => {
                ref5.current.focus();
            }}
            onBack={() => {
                ref3.current.focus();
            }}
        ></SubOtpBox>

        <SubOtpBox
            ref={ref5}
            inputBoxVal={inputBoxVal5}
            setInputBoxVal={setInputBoxVal5}
            onDone={() => {
                ref6.current.focus();
            }}
            onBack={() => {
                ref4.current.focus();
            }}
        ></SubOtpBox>

        <SubOtpBox
            ref={ref6}
            inputBoxVal={inputBoxVal6}
            setInputBoxVal={setInputBoxVal6}
            onDone={() => {
                setDisabled(false);
            }}
            onBack={() => {
                ref5.current.focus();
            }}
        ></SubOtpBox>

        <br></br>
        <button disabled={disabled}>Verify</button>
    </div>
}

function SubOtpBox({
    ref, onDone, onBack, inputBoxVal, setInputBoxVal
}) {

    return <div>
        <input
    value={inputBoxVal}
    ref={ref}
    onKeyUp={(e) => {
        if (e.key == "Backspace") {
            setInputBoxVal("");
            onBack();
        }
    }}
    onChange={(e) => {
        const val = e.target.value;
        if (
            val == "1" || val == "2" || val == "3" ||
            val == "4" || val == "5" || val == "6" ||
            val == "7" || val == "8" || val == "9" ||
            val == "0"
        ) {
            setInputBoxVal(val);
            onDone();
        }
    }}
    type="text"
    className="m-2 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white">
</input>
    </div>
}