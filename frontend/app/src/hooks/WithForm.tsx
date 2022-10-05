import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {Form} from "../components";

interface FormProps {
  defaultValues: object;
  onSubmit: (data: object) => void;
  children: ReactJSXElement | ReactJSXElement[];
}

const WithForm: React.FC<FormProps> = ({ children, defaultValues, onSubmit }) => {
    const methods = useForm({
        defaultValues,
    });

    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {children}
            </Form>
        </FormProvider>
    );
};

export default WithForm;

