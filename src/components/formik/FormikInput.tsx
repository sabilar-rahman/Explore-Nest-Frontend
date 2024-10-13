// "use client";
// import { ErrorMessage, Field, FieldProps } from "formik";
// import { Input } from "@nextui-org/input";

// interface InputProps {
//   name: string;
//   label?: string;
//   type?: string;
//   value?: string;
//   readOnly?: boolean;
//   placeholder?: string;
//   defaultValue?: string | number;
//   required?: boolean;
// }

// const FormikInput: React.FC<InputProps> = ({
//   name,
//   label,
//   type = "text",
//   readOnly = false,
//   placeholder,
//   defaultValue,
//   required = false,
// }) => {
//   return (
//     <div className="flex flex-col flex-grow font-publicSans lg:w-auto w-full">
//       <Field name={name}>
//         {({ field }: FieldProps) => (
//           <>
//             <Input
//               {...field}
//               size="sm"
//               type={type}
//               label={label}
//               readOnly={readOnly}
//               placeholder={placeholder}
//               required={required}
//               defaultValue={defaultValue as string}
//               id={name}
//             />
//           </>
//         )}
//       </Field>
//       <ErrorMessage name={name} component="p" className="text-danger" />
//     </div>
//   );
// };

// export default FormikInput;

"use client";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Input } from "@nextui-org/input";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  isTextArea?: boolean; // New prop to control textarea
  value?: string;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
}

const FormikInput: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  isTextArea = false, // Default to false
  readOnly = false,
  placeholder,
  defaultValue,
  required = false,
}) => {
  return (
    <div className="flex flex-col flex-grow font-publicSans lg:w-auto w-full">
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            {isTextArea ? (
              <textarea
                {...field}
                id={name}
                // className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                readOnly={readOnly}
                required={required}
                rows={4}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <Input
                {...field}
                size="sm"
                type={type}
                label={label}
                readOnly={readOnly}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue as string}
                id={name}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormikInput;

