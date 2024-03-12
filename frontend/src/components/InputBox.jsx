import React from "react";

export function InputBox({ label, placeHolder, onChange, type }) {
  return (
    <>
      <div className="mt-2">
        <from>
          <div>
            <h1 className="font-bold text-ms">{label}</h1>
            <input
              type={type}
              required
              className="border-2 outline-none w-full text-xl my-2 px-1 py-1 rounded-md"
              placeholder={placeHolder}
              onChange={onChange}
              spellCheck="false"
            />
          </div>
        </from>
      </div>
    </>
  );
}
export function PasswordInputBox({label, placeHolder, onChange}) {
  return <>
  <div className="mt-2">
  <from>
    <div>
      <h1 className="font-bold text-ms">{label}</h1>
      <input
        type="password"
        required
        className="border-2 outline-none w-full text-xl my-2 px-1 py-1 rounded-md"
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  </from>
</div>
  </>;
}
