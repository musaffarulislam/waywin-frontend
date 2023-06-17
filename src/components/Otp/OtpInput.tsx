import React from "react";

type PartialInputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className"
>;

type Props = {
  value: string;
  onChange(value: string): void;
  size?: number;
  validationPattern?: RegExp;
} & PartialInputProps;

const OtpInput = (props: Props) => {
  const {
    size = 6,
    validationPattern = /[0-9]{1}/,
    value,
    onChange,
    className,
    ...restProps
  } = props;

  const arr = new Array(size).fill("-");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;

    if (!validationPattern.test(val) && val !== "") return;

    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, 6);
    onChange(newVal);

    if (val) {
      const next = elem.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const prev = current.nextSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    onChange(val);
  };

  return (
    <div className="flex justify-center my-8">
      <div className="flex gap-4 ">
        {arr.map((_, index) => {
          return (
            <input
              key={index}
              {...restProps}
              className={
                className ||
                `input input-bordered p-3 md:p-0
                  w-8 h-10 sm:w-12 sm:h:16 md:w-14 md:h-16 lg:w-20 lg:h-20
                  text-2xl md:text-3xl text-center text-gray-900 rounded-lg`
              }
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern={validationPattern.source}
              maxLength={6}
              value={value.at(index) ?? ""}
              onChange={(e) => handleInputChange(e, index)}
              onKeyUp={handleKeyUp}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
