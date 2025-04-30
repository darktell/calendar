import TimeSelector from 'react-time-picker';
import {useField} from "formik";


const TimePicker = ({name, label}) => {
    const [{value}, , {setValue}] = useField(name);

    return (
        <label>
            <p className="pb-1 text-sm">
                {label}
            </p>
            <TimeSelector onChange={setValue} value={value} disableClock locale="de"/>
        </label>
    )
}

export default TimePicker