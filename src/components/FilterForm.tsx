import DateRangePicker from "./DateRangePicker";
import {FC} from "react";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import 'react-time-picker/dist/TimePicker.css';
import TimePicker from "./TimePicker";

const VALIDATION_SCHEMA = Yup.object().shape({
    startDate: Yup.string()
        .required('Required'),
    endDate: Yup.string()
        .required('Required'),
});

interface FormValue {
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
}

const FilterForm: FC = () => {

    const onSubmit = (value: FormValue) => {
        console.log(value)
    }

    return (
        <Formik
            initialValues={{
                startDate: '',
                endDate: ''
            }}
            onSubmit={onSubmit}
            validationSchema={VALIDATION_SCHEMA}
            validateOnMount={false}
            validateOnChange={false}
        >
            <Form>
                <DateRangePicker
                    startDateName="startDate"
                    endDateName="endDate"
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <TimePicker name="startTime" label="Start Time"/>
                    <TimePicker name="endTime" label="End Time"/>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full text-white hover:text-primary bg-primary border border-primary hover:bg-white rounded-lg py-2 px-6 font-medium disabled:cursor-not-allowed">
                    Submit
                </button>
            </Form>
        </Formik>
    )
}

export default FilterForm