import { InputHTMLAttributes, ReactNode } from "react";

// const Input = styled.input`
//   appearance: textfield;

//   ::-webkit-inner-spin-button,
//   ::-webkit-outer-spin-button {
//     appearance: none;
//   }

//   font-size: 20px;
// `

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="text-md" />
);

// const StepButton = styled.button`
//   height: 20px;
// `

// export const StepperWrapper = styled.div`
//   background-color: #eeeeee;
//   border-radius: 4px;
//   padding: 6px;
//   margin: 4px;
//   display: flex;
//   flex-direction: column;
//   `
export const StepperWrapper = ({ children }: { children: ReactNode }) => (
  <div className="bg-neutral-400 rounded-sm p-2 m-2 flex flex-col">
    {children}
  </div>
);

// export const StepperLabel = styled.span`
//   font-size: 10px;
//   margin-bottom: 4px;
// `

export const StepperLabel = ({ children }: { children: ReactNode }) => (
  <span className="text-sm mb-2">{children}</span>
);

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export const Stepper = ({ value, onChange, min, max, step }: StepperProps) => {
  return (
    <div className="flex">
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          let newValue = Number(e.target.value);
          if (newValue > max) newValue = max;
          else if (newValue < min) newValue = min;
          newValue = Math.round(newValue * 10) / 10;
          onChange(newValue);
        }}
      />
      <div className="flex flex-col">
        <button
          className="h-6"
          tabIndex={-1}
          onClick={() => {
            let newValue = value + step;
            newValue = newValue > max ? max : newValue;
            newValue = Math.round(newValue * 10) / 10;
            onChange(newValue);
          }}
        >
          &#8963;
        </button>
        <button
          tabIndex={-1}
          onClick={() => {
            let newValue = value - step;
            newValue = newValue < min ? min : newValue;
            newValue = Math.round(newValue * 10) / 10;
            onChange(newValue);
          }}
        >
          &#8964;
        </button>
      </div>
    </div>
  );
};
